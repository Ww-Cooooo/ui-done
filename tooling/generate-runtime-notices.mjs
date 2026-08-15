import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

function loadLicenseInventory() {
  const pnpmCli = process.env.npm_execpath;
  if (pnpmCli) {
    return execFileSync(process.execPath, [pnpmCli, "licenses", "list", "--prod", "--json"], {
      encoding: "utf8"
    });
  }

  const command = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
  return execFileSync(command, ["licenses", "list", "--prod", "--json"], { encoding: "utf8" });
}

function findLicenseFile(packagePath) {
  const candidates = readdirSync(packagePath)
    .filter(name => /^(license|licence|copying|notice)(\.|$)/i.test(name))
    .sort((a, b) => a.localeCompare(b));

  if (!candidates.length) throw new Error(`No license file found for ${packagePath}`);
  return path.join(packagePath, candidates[0]);
}

const grouped = JSON.parse(loadLicenseInventory());
const packages = Object.entries(grouped)
  .flatMap(([license, entries]) => entries.map(entry => ({ ...entry, license })))
  .sort((a, b) => a.name.localeCompare(b.name));

const sections = packages.map(entry => {
  const packagePath = entry.paths[0];
  const licenseFile = findLicenseFile(packagePath);
  const licenseText = readFileSync(licenseFile, "utf8").trim();
  const metadata = [
    `Package: ${entry.name}`,
    `Version: ${entry.versions.join(", ")}`,
    `License: ${entry.license}`,
    entry.author ? `Author: ${entry.author}` : null,
    entry.homepage ? `Homepage: ${entry.homepage}` : null
  ].filter(Boolean).join("\n");

  return `${"=".repeat(78)}\n${metadata}\n${"-".repeat(78)}\n${licenseText}`;
});

const output = [
  "UI DONE SHOWCASE RUNTIME: THIRD-PARTY LICENSES",
  "",
  "Generated from the exact production dependency tree in pnpm-lock.yaml.",
  "Keep this file with ui-done-core.js and ui-done-control-chart.js when copying",
  "or redistributing the prebuilt showcase runtime.",
  "",
  ...sections,
  ""
].join("\n");

writeFileSync("showcase/shared/runtime/THIRD_PARTY_LICENSES.txt", output, "utf8");
