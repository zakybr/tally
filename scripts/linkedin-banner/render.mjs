import { chromium } from "playwright";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "banner.html");
const out2x = path.join(__dirname, "banner-2x.png");
const outFinal = path.resolve(__dirname, "../../public/linkedin-banner.png");

const WIDTH = 2256;
const HEIGHT = 382;
const FINAL_W = 1128;
const FINAL_H = 191;

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });

  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
  await page.waitForSelector("#banner");

  const banner = page.locator("#banner");
  await banner.screenshot({
    path: out2x,
    type: "png",
    omitBackground: false,
  });

  await browser.close();

  await sharp(out2x)
    .resize(FINAL_W, FINAL_H, {
      kernel: sharp.kernel.lanczos3,
      fit: "fill",
    })
    .flatten({ background: { r: 8, g: 9, b: 11 } }) // #08090b, no alpha
    .png({ compressionLevel: 9 })
    .toFile(outFinal);

  // Clean intermediate 2x (keep only final deliverable in public)
  await fs.unlink(out2x).catch(() => {});

  const meta = await sharp(outFinal).metadata();
  console.log(
    `Wrote ${outFinal} (${meta.width}x${meta.height}, channels=${meta.channels}, hasAlpha=${meta.hasAlpha})`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
