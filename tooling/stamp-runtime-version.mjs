import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const showcasePages = [
  "aer-run",
  "control-room",
  "corner-store",
  "form-shift",
  "gallery",
  "pocket-planner",
  "tide-journal"
];

const runtimeAssets = [
  "ui-done-core.css",
  "ui-done-core.js",
  "ui-done-control-chart.js"
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
  let next = source;

  for (const [asset, version] of versions) {
    const escapedAsset = asset.replaceAll(".", "\\.");
    const reference = new RegExp(`(\\.\\./shared/runtime/${escapedAsset})(?:\\?v=[a-f0-9]+)?`, "g");
    next = next.replace(reference, `$1?v=${version}`);
  }

  if (next !== source) writeFileSync(pagePath, next, "utf8");
}
