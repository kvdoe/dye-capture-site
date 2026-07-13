import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT =
  "C:/Users/karan/AppData/Local/Temp/claude/C--Users-karan/050ce714-2351-45e1-a89e-6ae625a82ff3/scratchpad/shots";
mkdirSync(OUT, { recursive: true });
const URL = "http://localhost:3210";

async function launch() {
  for (const channel of ["msedge", "chrome"]) {
    try {
      return await chromium.launch({ channel, headless: true });
    } catch {}
  }
  return await chromium.launch({ headless: true });
}
const browser = await launch();

async function run(prefix, width, height) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/${prefix}-hero.jpg`, quality: 68, type: "jpeg" });
  for (const id of ["poster", "results", "finding", "gallery"]) {
    await page.evaluate((i) => {
      const el = document.getElementById(i);
      if (el) el.scrollIntoView({ block: "start" });
    }, id);
    await page.waitForTimeout(1100);
    await page.screenshot({ path: `${OUT}/${prefix}-${id}.jpg`, quality: 68, type: "jpeg" });
  }
  await page.close();
  console.log(prefix, "done");
}

await run("d", 1440, 900);
await run("m", 390, 844);
await browser.close();
console.log("done");
