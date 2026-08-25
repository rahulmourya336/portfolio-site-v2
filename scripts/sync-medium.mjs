/**
 * Refreshes the committed Medium feed snapshot used as a build-time fallback.
 * Run with: npm run sync:medium
 */
import fs from "node:fs";
import path from "node:path";

const FEED = "https://medium.com/feed/@i.e.rahul";
const OUT = path.join(process.cwd(), "content/external/medium-feed.xml");

const response = await fetch(FEED, {
  headers: { "user-agent": "rahulmourya.dev portfolio build" },
});
if (!response.ok) {
  console.error(`Feed request failed: ${response.status}`);
  process.exit(1);
}

const xml = await response.text();
fs.writeFileSync(OUT, xml, "utf-8");
console.log(`Saved ${(xml.length / 1024) | 0}KB to ${OUT}`);
