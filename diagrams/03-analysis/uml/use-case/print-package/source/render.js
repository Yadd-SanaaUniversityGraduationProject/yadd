// Render an SVG file to PNG at a given pixel width using resvg.
const fs = require("fs");
const { Resvg } = require("@resvg/resvg-js");

const [, , inPath, outPath, widthArg] = process.argv;
const svg = fs.readFileSync(inPath, "utf8");
const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: parseInt(widthArg, 10) },
  background: "#ffffff",
  font: { loadSystemFonts: false },
});
const png = resvg.render().asPng();
fs.writeFileSync(outPath, png);
console.log(`rendered ${outPath} (${png.length} bytes)`);
