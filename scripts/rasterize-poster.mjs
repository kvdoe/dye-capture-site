// Rasterizes page 1 of the poster PDF to public/poster.png for on-page display.
import { pdf } from "pdf-to-img";
import sharp from "sharp";
import path from "node:path";

const SRC = path.resolve("public/poster.pdf");
const OUT = path.resolve("public/poster.png");

const document = await pdf(SRC, { scale: 2.4 });
let first;
for await (const page of document) {
  first = page; // Buffer (PNG)
  break;
}
if (!first) {
  console.error("No pages rendered");
  process.exit(1);
}
const meta = await sharp(first).metadata();
// Re-encode through sharp to keep it lean while staying crisp.
await sharp(first).png({ quality: 90, compressionLevel: 9 }).toFile(OUT);
const out = await sharp(OUT).metadata();
console.log(`poster.png ${out.width}x${out.height} (source render ${meta.width}x${meta.height})`);
