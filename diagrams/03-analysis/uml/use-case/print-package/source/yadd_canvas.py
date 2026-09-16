"""
YADD print diagram toolkit — vector canvas with SVG / PDF / PNG output.

Every drawing primitive is recorded once and emitted to all three formats so
that the printed PDF, the SVG and the PNG are pixel-identical.
Coordinates are millimetres, origin top-left, y grows downwards.
"""
from __future__ import annotations

import math
import os
import subprocess
from dataclasses import dataclass, field

import yadd_text as yt

PT = 72.0 / 25.4  # mm -> pt


# --------------------------------------------------------------------------- #
@dataclass
class Canvas:
    width: float
    height: float
    ops: list = field(default_factory=list)
    title: str = "YADD diagram"

    # ---- primitives ------------------------------------------------------ #
    def rect(self, x, y, w, h, fill=None, stroke=None, sw=0.25, rx=0.0, dash=None, opacity=1.0):
        self.ops.append(dict(t="rect", x=x, y=y, w=w, h=h, rx=rx, fill=fill, stroke=stroke,
                             sw=sw, dash=dash, opacity=opacity))

    def ellipse(self, cx, cy, rx, ry, fill=None, stroke=None, sw=0.25, dash=None, opacity=1.0):
        self.ops.append(dict(t="ellipse", cx=cx, cy=cy, rx=rx, ry=ry, fill=fill, stroke=stroke,
                             sw=sw, dash=dash, opacity=opacity))

    def line(self, x1, y1, x2, y2, stroke="#111827", sw=0.25, dash=None, opacity=1.0):
        self.ops.append(dict(t="line", x1=x1, y1=y1, x2=x2, y2=y2, stroke=stroke, sw=sw,
                             dash=dash, opacity=opacity))

    def poly(self, pts, fill=None, stroke=None, sw=0.25, dash=None, closed=True, opacity=1.0,
             even_odd=False):
        self.ops.append(dict(t="poly", pts=list(pts), fill=fill, stroke=stroke, sw=sw, dash=dash,
                             closed=closed, opacity=opacity, even_odd=even_odd))

    def contours(self, contours, fill=None, stroke=None, sw=0.25, opacity=1.0, dash=None):
        """List of contours, each a list of ('M'|'L'|'Q'|'C'|'Z', ...) segments."""
        self.ops.append(dict(t="contours", contours=contours, fill=fill, stroke=stroke, sw=sw,
                             opacity=opacity, dash=dash))

    def text(self, x, y, s, size=9.0, font=None, fill="#111827", align="left",
             baseline="middle", bold_latin=False, opacity=1.0, letter_spacing=0.0):
        """Draw text as outlines. align: left|center|right ; baseline: middle|base|top."""
        glyphs = yt.layout_text(s, size, font_name=font, bold_latin=bold_latin,
                                letter_spacing=letter_spacing)
        w = yt.text_width(glyphs)
        dx = 0.0
        if align == "center":
            dx = -w / 2.0
        elif align == "right":
            dx = -w
        size_mm = size * yt.MM_PER_PT
        dy = 0.0
        if baseline == "middle":
            dy = size_mm * 0.34
        elif baseline == "top":
            dy = size_mm * 0.80
        for g in glyphs:
            g.x += x + dx
            g.y = y + dy
        all_contours = []
        for g in glyphs:
            all_contours.extend(yt.glyph_contours(g))
        self.contours(all_contours, fill=fill, opacity=opacity)
        return w

    def measure(self, s, size, font=None, bold_latin=False, letter_spacing=0.0):
        return yt.text_width(yt.layout_text(s, size, font_name=font, bold_latin=bold_latin,
                                            letter_spacing=letter_spacing))

    def arrows(self, x1, y1, x2, y2, kind="open", size=2.4, stroke="#111827", sw=0.25,
               dash=None, head_at_end=True, shrink_start=0.0, shrink_end=0.0):
        """Draw a line with an arrow head (open V or solid triangle)."""
        ang = math.atan2(y2 - y1, x2 - x1)
        sx = x1 + math.cos(ang) * shrink_start
        sy = y1 + math.sin(ang) * shrink_start
        ex = x2 - math.cos(ang) * shrink_end
        ey = y2 - math.sin(ang) * shrink_end
        self.line(sx, sy, ex, ey, stroke=stroke, sw=sw, dash=dash)
        if head_at_end:
            self.arrow_head(ex, ey, ang + math.pi, kind=kind, size=size, stroke=stroke, sw=sw)
        return (ex, ey)

    def arrow_head(self, x, y, ang, kind="open", size=2.4, stroke="#111827", sw=0.25):
        """Arrow head pointing in direction `ang` (radians) located at (x, y)."""
        spread = math.radians(22)
        p1 = (x + math.cos(ang - spread) * size, y + math.sin(ang - spread) * size)
        p2 = (x + math.cos(ang + spread) * size, y + math.sin(ang + spread) * size)
        if kind == "open":
            self.poly([p1, (x, y), p2], fill=None, stroke=stroke, sw=sw, closed=False)
        else:
            self.poly([p1, (x, y), p2], fill=stroke, stroke=stroke, sw=sw * 0.6, closed=True)

    # ---- composition ------------------------------------------------------ #
    def translated(self, dx, dy):
        """Return a copy of the recorded ops shifted by (dx, dy) mm."""
        out = []
        for op in self.ops:
            o = dict(op)
            t = o["t"]
            if t == "rect":
                o["x"] += dx; o["y"] += dy
            elif t == "ellipse":
                o["cx"] += dx; o["cy"] += dy
            elif t == "line":
                o["x1"] += dx; o["y1"] += dy; o["x2"] += dx; o["y2"] += dy
            elif t in ("poly", "contours"):
                if t == "poly":
                    o["pts"] = [(x + dx, y + dy) for x, y in o["pts"]]
                else:
                    nc = []
                    for con in o["contours"]:
                        ncon = []
                        for seg in con:
                            k = seg[0]
                            if k == "M" or k == "L":
                                ncon.append((k, seg[1] + dx, seg[2] + dy))
                            elif k == "Q":
                                ncon.append((k, seg[1] + dx, seg[2] + dy, seg[3] + dx, seg[4] + dy))
                            elif k == "C":
                                ncon.append((k, seg[1] + dx, seg[2] + dy, seg[3] + dx, seg[4] + dy,
                                             seg[5] + dx, seg[6] + dy))
                            else:
                                ncon.append((k,))
                        nc.append(ncon)
                    o["contours"] = nc
            out.append(o)
        return out

    def extend(self, ops):
        self.ops.extend(ops)

    # ---- output ---------------------------------------------------------- #
    def _dash_attr(self, dash):
        if not dash:
            return ""
        return ' stroke-dasharray="%s"' % " ".join(f"{d:.3f}" for d in dash)

    def to_svg(self) -> str:
        o = ['<?xml version="1.0" encoding="UTF-8"?>']
        o.append(f'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" '
                 f'width="{self.width:.4f}mm" height="{self.height:.4f}mm" '
                 f'viewBox="0 0 {self.width:.4f} {self.height:.4f}">')
        t = (self.title.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))
        o.append(f"<title>{t}</title>")
        o.append('<rect x="0" y="0" width="%.4f" height="%.4f" fill="#FFFFFF"/>' % (self.width, self.height))
        o.append('<g fill="none" stroke="none" stroke-linecap="round" stroke-linejoin="round">')
        for op in self.ops:
            t = op["t"]
            fill = op.get("fill") or "none"
            stroke = op.get("stroke") or "none"
            sw = op.get("sw", 0.25)
            op_attr = "" if op.get("opacity", 1.0) >= 1.0 else f' opacity="{op["opacity"]:.3f}"'
            if t == "rect":
                r = f' rx="{op["rx"]:.3f}" ry="{op["rx"]:.3f}"' if op["rx"] else ""
                o.append(f'<rect x="{op["x"]:.3f}" y="{op["y"]:.3f}" width="{op["w"]:.3f}" '
                         f'height="{op["h"]:.3f}"{r} fill="{fill}" stroke="{stroke}" '
                         f'stroke-width="{sw:.3f}"{self._dash_attr(op["dash"])}{op_attr}/>')
            elif t == "ellipse":
                o.append(f'<ellipse cx="{op["cx"]:.3f}" cy="{op["cy"]:.3f}" rx="{op["rx"]:.3f}" '
                         f'ry="{op["ry"]:.3f}" fill="{fill}" stroke="{stroke}" '
                         f'stroke-width="{sw:.3f}"{self._dash_attr(op["dash"])}{op_attr}/>')
            elif t == "line":
                o.append(f'<line x1="{op["x1"]:.3f}" y1="{op["y1"]:.3f}" x2="{op["x2"]:.3f}" '
                         f'y2="{op["y2"]:.3f}" stroke="{stroke}" stroke-width="{sw:.3f}"'
                         f'{self._dash_attr(op["dash"])}{op_attr}/>')
            elif t == "poly":
                pts = " ".join(f"{p[0]:.3f},{p[1]:.3f}" for p in op["pts"])
                tag = "polygon" if op["closed"] else "polyline"
                o.append(f'<{tag} points="{pts}" fill="{fill}" stroke="{stroke}" '
                         f'stroke-width="{sw:.3f}"{self._dash_attr(op["dash"])}{op_attr}/>')
            elif t == "contours":
                d = contours_to_path(op["contours"], op.get("even_odd", True))
                o.append(f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw:.3f}" '
                         f'fill-rule="evenodd"{op_attr}/>')
        o.append("</g></svg>")
        return "\n".join(o)

    def to_pdf(self, path: str):
        write_pdf_pages(path, [dict(w=self.width, h=self.height, ops=self.ops,
                                     title=self.title)])


def _draw_ops_on_pdf(c, ops, height):
    """Draw a recorded op list onto an open reportlab canvas (page height given)."""
    from reportlab.lib.colors import HexColor

    def C(col):
        return None if col is None else HexColor(col)

    def Y(y):
        return (height - y) * PT

    for op in ops:
        t = op["t"]
        fill, stroke = C(op.get("fill")), C(op.get("stroke"))
        sw = op.get("sw", 0.25) * PT
        opac = op.get("opacity", 1.0)
        if fill:
            c.setFillColor(fill, alpha=opac)
        if stroke:
            c.setStrokeColor(stroke, alpha=opac)
        c.setLineWidth(max(sw, 0.01))
        c.setDash([d * PT for d in op["dash"]] if op.get("dash") else [])
        if t == "rect":
            x, y, w, h = op["x"] * PT, Y(op["y"] + op["h"]), op["w"] * PT, op["h"] * PT
            if op["rx"]:
                c.roundRect(x, y, w, h, op["rx"] * PT, stroke=1 if stroke else 0,
                            fill=1 if fill else 0)
            else:
                c.rect(x, y, w, h, stroke=1 if stroke else 0, fill=1 if fill else 0)
        elif t == "ellipse":
            c.ellipse((op["cx"] - op["rx"]) * PT, Y(op["cy"] + op["ry"]),
                      (op["cx"] + op["rx"]) * PT, Y(op["cy"] - op["ry"]),
                      stroke=1 if stroke else 0, fill=1 if fill else 0)
        elif t == "line":
            c.line(op["x1"] * PT, Y(op["y1"]), op["x2"] * PT, Y(op["y2"]))
        elif t == "poly":
            p = c.beginPath()
            pts = op["pts"]
            if pts:
                p.moveTo(pts[0][0] * PT, Y(pts[0][1]))
                for q in pts[1:]:
                    p.lineTo(q[0] * PT, Y(q[1]))
                if op["closed"]:
                    p.close()
            c.drawPath(p, stroke=1 if stroke else 0, fill=1 if fill else 0,
                       fillMode=FILL_NON_ZERO())
        elif t == "contours":
            p = c.beginPath()
            for con in op["contours"]:
                cur = None
                for seg in con:
                    k = seg[0]
                    if k == "M":
                        p.moveTo(seg[1] * PT, Y(seg[2]))
                        cur = (seg[1], seg[2])
                    elif k == "L":
                        p.lineTo(seg[1] * PT, Y(seg[2]))
                        cur = (seg[1], seg[2])
                    elif k == "Q":
                        qx, qy = seg[1], seg[2]
                        ex, ey = seg[3], seg[4]
                        c1 = (cur[0] + 2 / 3 * (qx - cur[0]), cur[1] + 2 / 3 * (qy - cur[1]))
                        c2 = (ex + 2 / 3 * (qx - ex), ey + 2 / 3 * (qy - ey))
                        p.curveTo(c1[0] * PT, Y(c1[1]), c2[0] * PT, Y(c2[1]), ex * PT, Y(ey))
                        cur = (ex, ey)
                    elif k == "C":
                        p.curveTo(seg[1] * PT, Y(seg[2]), seg[3] * PT, Y(seg[4]),
                                  seg[5] * PT, Y(seg[6]))
                        cur = (seg[5], seg[6])
                    elif k == "Z":
                        p.close()
            c.drawPath(p, stroke=1 if stroke else 0, fill=1 if fill else 0,
                       fillMode=FILL_EVEN_ODD())


def FILL_NON_ZERO():
    from reportlab.pdfgen import canvas as rc
    return rc.FILL_NON_ZERO


def FILL_EVEN_ODD():
    from reportlab.pdfgen import canvas as rc
    return rc.FILL_EVEN_ODD


def write_pdf_pages(path: str, pages: list):
    """pages: list of dict(w, h, ops, title) in mm."""
    from reportlab.pdfgen import canvas as rc
    first = pages[0]
    c = rc.Canvas(path, pagesize=(first["w"] * PT, first["h"] * PT))
    c.setTitle(first.get("title", "YADD"))
    c.setLineJoin(1)
    c.setLineCap(1)
    for i, pg in enumerate(pages):
        if i:
            c.setPageSize((pg["w"] * PT, pg["h"] * PT))
            c.showPage()
            c.setLineJoin(1)
            c.setLineCap(1)
        _draw_ops_on_pdf(c, pg["ops"], pg["h"])
    c.showPage()
    c.save()


def contours_to_path(contours, even_odd=True) -> str:
    parts = []
    for con in contours:
        for seg in con:
            k = seg[0]
            if k == "M":
                parts.append(f"M{seg[1]:.3f} {seg[2]:.3f}")
            elif k == "L":
                parts.append(f"L{seg[1]:.3f} {seg[2]:.3f}")
            elif k == "Q":
                parts.append(f"Q{seg[1]:.3f} {seg[2]:.3f} {seg[3]:.3f} {seg[4]:.3f}")
            elif k == "C":
                parts.append(f"C{seg[1]:.3f} {seg[2]:.3f} {seg[3]:.3f} {seg[4]:.3f} "
                             f"{seg[5]:.3f} {seg[6]:.3f}")
            elif k == "Z":
                parts.append("Z")
    return "".join(parts)
