"""
YADD print diagram toolkit — Arabic/Latin text shaping to outlines.

Text is converted to glyph outlines (paths) so that the generated SVG/PDF/PNG
look identical everywhere and never depend on the viewer's fonts.

Shaping:  uharfbuzz (HarfBuzz)
Outlines: fontTools
Layout:   small bidi run model sufficient for diagram labels (Arabic + Latin).
"""
from __future__ import annotations

import os
import unicodedata
from dataclasses import dataclass, field

import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.basePen import BasePen

MM_PER_PT = 25.4 / 72.0

FONT_DIR = os.environ.get("YADD_FONT_DIR", os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts"))


# --------------------------------------------------------------------------- #
# Glyph outline extraction
# --------------------------------------------------------------------------- #
class ContourPen(BasePen):
    """Collects glyph outline as list of contours; each contour is a list of
    segments: ('M', x, y) | ('L', x, y) | ('C', x1,y1,x2,y2,x3,y3) | ('Q', x1,y1,x2,y2)."""

    def __init__(self, glyphSet):
        super().__init__(glyphSet)
        self.contours = []
        self._cur = None

    def _moveTo(self, pt):
        self._cur = [("M", pt[0], pt[1])]
        self.contours.append(self._cur)

    def _lineTo(self, pt):
        self._cur.append(("L", pt[0], pt[1]))

    def _curveToOne(self, p1, p2, p3):
        self._cur.append(("C", p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]))

    def _qCurveToOne(self, p1, p2):
        self._cur.append(("Q", p1[0], p1[1], p2[0], p2[1]))

    def _closePath(self):
        if self._cur and len(self._cur) > 1:
            self._cur.append(("Z",))
        self._cur = None

    def _endPath(self):
        self._cur = None


class Font:
    """A single font file with shaping + outline services."""

    def __init__(self, path: str, key: str):
        self.key = key
        self.path = path
        with open(path, "rb") as fh:
            data = fh.read()
        self.tt = TTFont(path, fontNumber=0, lazy=True)
        self.upem = self.tt["head"].unitsPerEm
        self.glyph_set = self.tt.getGlyphSet()
        self.glyph_order = self.tt.getGlyphOrder()
        self.hb_face = hb.Face(data)
        self.hb_font = hb.Font(self.hb_face)
        self.hb_font.scale = (self.upem, self.upem)
        self._cmap = self.tt.getBestCmap()
        self._outline_cache: dict[int, list] = {}
        self._adv_cache: dict[int, int] = {}

    # -- metrics ---------------------------------------------------------- #
    def name(self, gid: int) -> str:
        return self.glyph_order[gid]

    def advance(self, gid: int) -> int:
        if gid not in self._adv_cache:
            self._adv_cache[gid] = self.glyph_set[self.name(gid)].width
        return self._adv_cache[gid]

    def outline(self, gid: int) -> list:
        if gid not in self._outline_cache:
            pen = ContourPen(self.glyph_set)
            self.glyph_set[self.name(gid)].draw(pen)
            self._outline_cache[gid] = pen.contours
        return self._outline_cache[gid]

    def has_char(self, ch: str) -> bool:
        return ord(ch) in self._cmap


# --------------------------------------------------------------------------- #
# Font registry
# --------------------------------------------------------------------------- #
class FontRegistry:
    def __init__(self, font_dir: str = FONT_DIR):
        self.dir = font_dir
        self._fonts: dict[str, Font] = {}

    def get(self, name: str) -> Font:
        if name not in self._fonts:
            path = os.path.join(self.dir, name)
            if not os.path.exists(path):
                raise FileNotFoundError(path)
            self._fonts[name] = Font(path, name)
        return self._fonts[name]


REGISTRY = FontRegistry()

# The diagram font stack -----------------------------------------------------
ARABIC = "Cairo_400Regular.ttf"
ARABIC_MED = "Cairo_600SemiBold.ttf"
ARABIC_BOLD = "Cairo_700Bold.ttf"
LATIN = "DejaVuSans.ttf"
LATIN_BOLD = "DejaVuSans-Bold.ttf"


# --------------------------------------------------------------------------- #
# Bidi run model (reduced, sufficient for diagram labels)
# --------------------------------------------------------------------------- #
ARABIC_RANGES = (
    (0x0600, 0x06FF),
    (0x0750, 0x077F),
    (0x08A0, 0x08FF),
    (0xFB50, 0xFDFF),
    (0xFE70, 0xFEFF),
)


def _is_arabic(ch: str) -> bool:
    o = ord(ch)
    return any(a <= o <= b for a, b in ARABIC_RANGES)


def _is_latin(ch: str) -> bool:
    if ch.isalpha() and not _is_arabic(ch):
        return True
    return ord(ch) in (0x2018, 0x2019, 0x201C, 0x201D, 0x200D)  # quotes, ZWJ


def _is_digit(ch: str) -> bool:
    return ch.isdigit() or ch in "+-/.,:%"


def _is_strong_rtl(ch: str) -> bool:
    return _is_arabic(ch) or ch in "،؛؟"


def _is_strong_ltr(ch: str) -> bool:
    return _is_latin(ch)


def _classify(ch: str) -> str:
    if _is_strong_rtl(ch):
        return "R"
    if _is_strong_ltr(ch):
        return "L"
    if _is_digit(ch):
        return "D"
    return "N"


@dataclass
class Run:
    text: str
    direction: str  # 'rtl' | 'ltr'


def split_runs(text: str) -> tuple[str, list[Run]]:
    """Split into directional runs; returns (base_direction, runs in logical order)."""
    base = None
    for ch in text:
        cl = _classify(ch)
        if cl == "R":
            base = "rtl"
            break
        if cl == "L":
            base = "ltr"
            break
    base = base or "ltr"

    resolved: list[str] = []
    prev_dir = base
    for ch in text:
        c = _classify(ch)
        if c == "R":
            resolved.append("rtl")
            prev_dir = "rtl"
        elif c == "L":
            resolved.append("ltr")
            prev_dir = "ltr"
        elif c == "D":
            resolved.append("ltr")
        else:  # neutral follows previous direction (or base at start)
            resolved.append(prev_dir if resolved else base)

    # Trailing neutrals follow the previous strong direction again
    runs: list[Run] = []
    buf = ""
    cur = None
    for ch, d in zip(text, resolved):
        if cur is None:
            cur, buf = d, ch
        elif d == cur:
            buf += ch
        else:
            runs.append(Run(buf, cur))
            cur, buf = d, ch
    if buf:
        runs.append(Run(buf, cur))

    # Neutral-only text: force base direction
    return base, runs


# --------------------------------------------------------------------------- #
# Shaping + measurement
# --------------------------------------------------------------------------- #
@dataclass
class Glyph:
    gid: int
    font: Font
    x: float          # left edge of glyph advance box, mm
    y: float          # baseline y, mm
    size: float       # font size in mm (em height)
    rtl: bool = False
    x_off: float = 0.0
    y_off: float = 0.0


def _shape(text: str, font_name: str, direction: str) -> tuple[Font, list[tuple[int, float, float]]]:
    """Return (font, [(gid, x_advance_em, x_offset_em, y_offset_em)]) in visual order."""
    font = REGISTRY.get(font_name)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.direction = direction
    buf.script = "Arab" if direction == "rtl" and any(_is_arabic(c) for c in text) else "Latn"
    if _is_arabic(text[:1]):
        buf.language = "ar"
    hb.shape(font.hb_font, buf, {"kern": True, "liga": True, "calt": True, "mark": True, "mkmk": True, "rlig": True})
    out = []
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        out.append((info.codepoint, pos.x_advance / font.upem, pos.x_offset / font.upem, pos.y_offset / font.upem))
    return font, out


def layout_text(text: str, size_pt: float, font_name: str | None = None,
                bold_latin: bool = False, letter_spacing: float = 0.0) -> list[Glyph]:
    """Lay out a (possibly mixed) string; glyphs carry x = distance from the
    left edge of the whole string, y = baseline of the single text line.

    Reduced bidi model for diagram labels:
      1. tokens are classified by their direction;
      2. consecutive atoms of the same direction are merged into one run, so a
         Latin phrase such as "Core entry point" is never re-ordered;
      3. a line whose base direction is right-to-left is laid out by placing the
         runs from the right edge, i.e. the run list is reversed while each run
         keeps its internal order. Arabic labels still read correctly, and a
         trailing ":" stays on the visual left of an Arabic word.
    """
    size_mm = size_pt * MM_PER_PT
    base, _ = split_runs(text)

    atoms: list = []          # (text, direction, is_space)
    for i, tok in enumerate(text.split(" ")):
        if i:
            atoms.append((" ", "rtl" if base == "rtl" else "ltr", True))
        if not tok:
            continue
        tok_base, truns = split_runs(tok)
        if tok_base == "rtl":
            truns = list(reversed(truns))
        for r in truns:
            if r.text:
                atoms.append((r.text, r.direction, False))

    runs: list[list] = []     # [text, direction]; spaces are kept inside runs
    for txt, direction, is_space in atoms:
        if is_space:
            if runs:
                runs[-1][0] += " "
            continue
        if runs and runs[-1][1] == direction:
            runs[-1][0] += txt
        else:
            runs.append([txt, direction])
    if not runs:
        return []
    ordered = list(reversed(runs)) if base == "rtl" else runs

    glyphs: list[Glyph] = []
    pen_x = 0.0
    for core, direction in ordered:
        if font_name is not None:
            fname = font_name
        elif any(_is_arabic(c) for c in core):
            fname = ARABIC
        else:
            fname = LATIN_BOLD if bold_latin else LATIN
        font, shaped = _shape(core, fname, direction)
        for gid, xa, xo, yo in shaped:
            g = Glyph(gid=gid, font=font, x=pen_x, y=0.0, size=size_mm,
                      rtl=(direction == "rtl"))
            g.x_off = xo * size_mm
            g.y_off = yo * size_mm
            glyphs.append(g)
            pen_x += xa * size_mm + letter_spacing * MM_PER_PT
    return glyphs


def text_width(glyphs: list[Glyph]) -> float:
    if not glyphs:
        return 0.0
    g = glyphs[-1]
    return g.x + g.font.advance(g.gid) / g.font.upem * g.size + g.x_off


def glyph_contours(g: Glyph) -> list:
    """Glyph contours in mm, positioned in canvas space (y down)."""
    scale = g.size / g.font.upem
    out = []
    for c in g.font.outline(g.gid):
        nc = []
        for seg in c:
            if seg[0] == "M":
                nc.append(("M", g.x + (seg[1] + 0) * scale + g.x_off, g.y - seg[2] * scale - g.y_off))
            elif seg[0] == "L":
                nc.append(("L", g.x + seg[1] * scale + g.x_off, g.y - seg[2] * scale - g.y_off))
            elif seg[0] == "Q":
                nc.append(("Q", g.x + seg[1] * scale + g.x_off, g.y - seg[2] * scale - g.y_off,
                           g.x + seg[3] * scale + g.x_off, g.y - seg[4] * scale - g.y_off))
            elif seg[0] == "C":
                nc.append(("C", g.x + seg[1] * scale + g.x_off, g.y - seg[2] * scale - g.y_off,
                           g.x + seg[3] * scale + g.x_off, g.y - seg[4] * scale - g.y_off,
                           g.x + seg[5] * scale + g.x_off, g.y - seg[6] * scale - g.y_off))
            else:
                nc.append(("Z",))
        out.append(nc)
    return out
