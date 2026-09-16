"""Build the complete YADD use-case print package (PNG / PDF / SVG)."""
from __future__ import annotations
import json
import os
import shutil
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from yadd_canvas import Canvas, write_pdf_pages  # noqa: E402
import yadd_panels as yp  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.environ.get("YADD_REPO", "/home/user/yadd")
OUT = os.path.join(REPO, "diagrams/03-analysis/uml/use-case/print-package")
TMP = os.path.join(HERE, "out")

NAMES = {
    "A": "yadd-usecase-plan1-core-service-journey-A4",
    "B": "yadd-usecase-plan2-trust-admin-provider-A4",
}
SPREAD = "yadd-usecase-spread-A3"
TWOPAGE = "yadd-usecase-A4-two-pages-side-by-side"


def render_png(svg_path, png_path, width_px):
    subprocess.run(["node", os.path.join(HERE, "render.js"), svg_path, png_path,
                    str(width_px)], check=True, cwd=HERE,
                   stdout=subprocess.DEVNULL)


def main():
    os.makedirs(TMP, exist_ok=True)
    for sub in ("png", "svg", "pdf", "source"):
        os.makedirs(os.path.join(OUT, sub), exist_ok=True)

    panels = yp.make_panels()          # [(Panel A, canvas), (Panel B, canvas)]
    canvases = {p.tag: c for p, c in panels}

    # ---------------------------------------------------------------- panels
    for tag, c in canvases.items():
        svg = c.to_svg()
        svg_path = os.path.join(OUT, "svg", NAMES[tag] + ".svg")
        open(svg_path, "w").write(svg)
        c.to_pdf(os.path.join(OUT, "pdf", NAMES[tag] + ".pdf"))
        render_png(svg_path, os.path.join(OUT, "png", NAMES[tag] + ".png"), 2480)

    # ---------------------------------------------------------------- spread
    spread = Canvas(420.0, 297.0, title="YADD — Use Case Model — A3 spread")
    spread.extend(canvases["B"].ops)
    spread.extend(canvases["A"].translated(210.0, 0.0))
    svg_path = os.path.join(OUT, "svg", SPREAD + ".svg")
    open(svg_path, "w").write(spread.to_svg())
    write_pdf_pages(os.path.join(OUT, "pdf", SPREAD + ".pdf"),
                    [dict(w=420.0, h=297.0, ops=spread.ops,
                          title="YADD — Use Case Model — A3 spread")])
    render_png(svg_path, os.path.join(OUT, "png", SPREAD + ".png"), 4961)

    # ------------------------------------------------- two A4 pages, one file
    write_pdf_pages(os.path.join(OUT, "pdf", TWOPAGE + ".pdf"),
                    [dict(w=210.0, h=297.0, ops=canvases["B"].ops,
                          title="YADD — Use Case Diagram (2 of 2)"),
                     dict(w=210.0, h=297.0, ops=canvases["A"].ops,
                          title="YADD — Use Case Diagram (1 of 2)")])

    # ---------------------------------------------------------------- source
    for fn in ("yadd_text.py", "yadd_canvas.py", "yadd_panels.py", "yadd_package.py",
               "render.js"):
        shutil.copy(os.path.join(HERE, fn), os.path.join(OUT, "source", fn))

    for root, _, files in os.walk(OUT):
        for f in sorted(files):
            p = os.path.join(root, f)
            print(f"{os.path.relpath(p, OUT):70s} {os.path.getsize(p)/1024:9.1f} KB")


if __name__ == "__main__":
    main()
