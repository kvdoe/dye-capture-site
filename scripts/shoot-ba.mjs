import { chromium } from "playwright";
const OUT =
  "C:/Users/karan/AppData/Local/Temp/claude/C--Users-karan/050ce714-2351-45e1-a89e-6ae625a82ff3/scratchpad/shots";
const URL = "http://localhost:3210";
async function launch() {
  for (const c of ["msedge", "chrome"]) {
    try { return await chromium.launch({ channel: c, headless: true }); } catch {}
  }
  return await chromium.launch({ headless: true });
}
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1200);
// scroll so the before/after figure is centered
await page.evaluate(() => {
  const cap = [...document.querySelectorAll("figcaption")].find((f) =>
    f.textContent.includes("Drag to compare")
  );
  if (cap) cap.scrollIntoView({ block: "center" });
});
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/beforeafter.jpg`, quality: 80, type: "jpeg" });
await browser.close();
console.log("shot beforeafter");
