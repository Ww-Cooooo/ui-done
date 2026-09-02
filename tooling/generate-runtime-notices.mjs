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

const standardLicenseTexts = {
  MIT: `MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
  ISC: `ISC License

Copyright (c) Upstream authors and contributors

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.`,
  "0BSD": `BSD Zero Clause License

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.`
};

function normalizeLicenseText(value) {
  return value
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map(line => line.trimEnd())
    .join("\n")
    .trim();
}

function loadLicenseText(entry, packagePath) {
  const candidates = readdirSync(packagePath)
    .filter(name => /^(license|licence|copying|notice)(\.|$)/i.test(name))
    .sort((a, b) => a.localeCompare(b));

  if (candidates.length) {
    return normalizeLicenseText(readFileSync(path.join(packagePath, candidates[0]), "utf8"));
  }

  const fallback = standardLicenseTexts[entry.license];
  if (!fallback) throw new Error(`No license file or approved fallback found for ${entry.name} (${entry.license})`);
  return normalizeLicenseText([
    `Published-package note: ${entry.name} declares ${entry.license} in package metadata`,
    "but this exact published package did not include a standalone license file.",
    "The standard license text follows; upstream authors retain their copyright.",
    "",
    fallback
  ].join("\n"));
}

const grouped = JSON.parse(loadLicenseInventory());
const packages = Object.entries(grouped)
  .flatMap(([license, entries]) => entries.map(entry => ({ ...entry, license })))
  .sort((a, b) => a.name.localeCompare(b.name));

const sections = packages.map(entry => {
  const packagePath = entry.paths[0];
  const licenseText = loadLicenseText(entry, packagePath);
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
  "Keep this file with ui-done-app.js, ui-done-app.css, chunks/, and assets/",
  "when copying or redistributing the prebuilt showcase runtime.",
  "",
  ...sections,
  ""
].join("\n");

writeFileSync("showcase/shared/runtime/THIRD_PARTY_LICENSES.txt", output, "utf8");
