// Converts the raw lab photos (mostly Apple HEIC) into web-optimized JPEGs
// placed in /public/photos. Run once with: npm run convert-images
//
// Source dir can be overridden with SRC env var; defaults to the scratch dir
// where the originals were downloaded.
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import heicConvert from "heic-convert";

const SRC =
  process.env.SRC ||
  "C:/Users/karan/AppData/Local/Temp/claude/C--Users-karan/050ce714-2351-45e1-a89e-6ae625a82ff3/scratchpad/heic";
const OUT = path.resolve("public/photos");

const MAX_W = 1920; // full-size long edge cap; next/image handles the rest
const QUALITY = 82;

function slug(name) {
  const base = name.replace(/\.[^.]+$/, "").toLowerCase();
  return base.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

async function toRgbBuffer(file, buf) {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".heic" || ext === ".heif") {
    // heic-convert decodes HEIF -> JPEG buffer (pure JS, no native deps)
    return await heicConvert({ buffer: buf, format: "JPEG", quality: 0.92 });
  }
  return buf;
}

async function main() {
  if (!existsSync(SRC)) {
    console.error("Source dir not found:", SRC);
    process.exit(1);
  }
  await mkdir(OUT, { recursive: true });
  const files = (await readdir(SRC)).filter((f) =>
    /\.(heic|heif|jpg|jpeg|png)$/i.test(f)
  );
  console.log(`Found ${files.length} source images. Output -> ${OUT}`);

  const manifest = [];
  for (const file of files) {
    try {
      const raw = await readFile(path.join(SRC, file));
      const rgb = await toRgbBuffer(file, raw);
      const img = sharp(rgb).rotate(); // respect EXIF orientation
      const meta = await img.metadata();
      const outName = `${slug(file)}.jpg`;
      const pipeline = sharp(rgb).rotate();
      if (meta.width && meta.width > MAX_W) pipeline.resize({ width: MAX_W });
      const out = await pipeline
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toBuffer();
      await writeFile(path.join(OUT, outName), out);
      const finalMeta = await sharp(out).metadata();
      manifest.push({
        file: outName,
        w: finalMeta.width,
        h: finalMeta.height,
        orientation: (finalMeta.width || 0) >= (finalMeta.height || 0) ? "landscape" : "portrait",
        kb: Math.round(out.length / 1024),
      });
      console.log(`  ok ${outName} ${finalMeta.width}x${finalMeta.height} ${Math.round(out.length / 1024)}KB`);
    } catch (e) {
      console.error(`  FAIL ${file}: ${e.message}`);
    }
  }
  await writeFile(
    path.join(OUT, "_manifest.json"),
    JSON.stringify(manifest, null, 2)
  );
  console.log(`\nDone. ${manifest.length} images written. Manifest at public/photos/_manifest.json`);
}

main();
