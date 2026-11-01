// Compare slide pixels with the designer's original package in the same browser.
import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { serveSite } from "./serve.mjs";

const originalPackage = process.argv[2];
assert(originalPackage, "Pass the designer's original slides/ directory");
const candidatePackage = path.resolve(import.meta.dirname, "../slides");
const output = path.resolve(import.meta.dirname, "../validation/designer-comparison");
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const comparison = [];
try {
  for (const deckName of ["preset-t1a", "preset-secondstack", "preset-lakesentry", "preset-antares", "preset-swiss", "t1a-template"]) {
    const dataDir = path.resolve(import.meta.dirname, "decks", deckName);
    const deck = JSON.parse(await readFile(path.join(dataDir, "project/deck.json"), "utf8"));
    const original = await serveSite({ packageDir: originalPackage, dataDir });
    const candidate = await serveSite({ packageDir: candidatePackage, dataDir });
    const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    const pages = await Promise.all([context.newPage(), context.newPage()]);
    try {
      for (const scheme of ["light", "dark"]) {
        await Promise.all(pages.map(async (page, index) => {
          await page.goto(`${[original, candidate][index].url}/?theme=${scheme}#${deck.order[0]}`);
          await page.waitForFunction(() => !document.getElementById("app").hasAttribute("aria-busy"));
          await page.addStyleTag({ content: ".toolbar, .progress { display: none !important; }" });
          await page.evaluate(() => document.fonts.ready);
        }));
        for (const id of deck.order) {
          await Promise.all(pages.map(async (page) => {
            await page.evaluate((slide) => { location.hash = slide; }, id);
            await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
            await page.evaluate(() => document.fonts.ready);
          }));
          const images = await Promise.all(pages.map((page) => page.locator(".stage .slide-host").screenshot({ animations: "disabled" })));
          const identical = images[0].equals(images[1]);
          comparison.push({ deck: deckName, slide: id, scheme, identical });
          if (!identical) {
            for (const [index, name] of ["original", "candidate"].entries()) {
              await writeFile(path.join(output, `${deckName}-${id}-${scheme}-${name}.png`), images[index]);
            }
          }
        }
      }
      console.log(`${deckName}: compared ${deck.order.length * 2} slide images`);
    } finally {
      await context.close();
      await original.close();
      await candidate.close();
    }
  }
} finally {
  await browser.close();
}
await writeFile(path.join(output, "report.json"), JSON.stringify(comparison, null, 2) + "\n");
const changed = comparison.filter((item) => !item.identical);
console.log(`${comparison.length - changed.length}/${comparison.length} slide images are byte-identical to the designer package`);
assert.equal(changed.length, 0, JSON.stringify(changed));
