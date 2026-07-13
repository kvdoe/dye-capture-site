// One-off: make all body text fully opaque (no grey). Converts muted text
// utility classes to solid ink (light sections) / solid cream (dark sections).
// Does NOT touch backgrounds, borders, gradients, or accent colors.
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve("src");

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(tsx|ts)$/.test(e.name)) out.push(p);
  }
  return out;
}

const shades = "(30|35|40|45|50|55|60|65|70|75|80|85|90)";
let total = 0;
for (const file of await walk(ROOT)) {
  let s = await readFile(file, "utf8");
  const before = s;
  s = s.replace(/\btext-taupe\b/g, "text-ink");
  s = s.replace(new RegExp(`\\btext-ink\\/${shades}\\b`, "g"), "text-ink");
  s = s.replace(new RegExp(`\\btext-cream\\/${shades}\\b`, "g"), "text-cream");
  if (s !== before) {
    await writeFile(file, s);
    total++;
    console.log("updated", path.relative(ROOT, file));
  }
}
console.log(`\n${total} files updated`);
