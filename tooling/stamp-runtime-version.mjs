import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const showcasePages = [
  "atelier-noir",
  "corner-goods",
  "gallery",
  "grid-01",
  "neon-rift",
  "north-tide",
  "orbital-grid",
  "red-form",
  "shanshui-now",
  "still-day",
  "velocity-works"
];

const runtimeAssets = [
  "ui-done-app.css",
  "ui-done-app.js"
];

function contentVersion(filePath) {
  return createHash("sha256")
    .update(readFileSync(filePath))
    .digest("hex")
    .slice(0, 12);
}

const runtimeDir = path.resolve("showcase/shared/runtime");
const versions = new Map(
  runtimeAssets.map(asset => [asset, contentVersion(path.join(runtimeDir, asset))])
);

for (const page of showcasePages) {
  const pagePath = path.resolve("showcase", page, "index.html");
  const source = readFileSync(pagePath, "utf8");
  let next = `${source.replace(/\r\n?/g, "\n").trimEnd()}\n`;

  for (const [asset, version] of versions) {
    const escapedAsset = asset.replaceAll(".", "\\.");
    const reference = new RegExp(`(\\.\\./shared/runtime/${escapedAsset})(?:\\?v=[a-f0-9]+)?`, "g");
    next = next.replace(reference, `$1?v=${version}`);
  }

  if (next !== source) writeFileSync(pagePath, next, "utf8");
}
