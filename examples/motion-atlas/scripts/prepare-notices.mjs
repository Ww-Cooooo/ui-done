import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { copyFileSync, existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const app = JSON.parse(readFileSync(join(root, 'package.json')));
copyFileSync(join(root, 'LICENSE'), join(root, 'public/licenses/application-MIT.txt'));

const overrideFile = join(root, 'public/licenses/license-overrides.json');
const overrides = JSON.parse(readFileSync(overrideFile));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const normalize = value => value.replace(/\r\n?/g, '\n').trim();
const rootNotices = /^(?:licen[cs]e|notice|copying|ofl)(?:[.-]|$)|^copyright(?:notice)?(?:[.-]|$)/i;

function findMetadata(name, from) {
  const req = createRequire(from);
  try { return req.resolve(`${name}/package.json`); } catch { /* package exports may hide metadata */ }
  let entry;
  try { entry = req.resolve(name); } catch { return null; }
  let dir = dirname(entry);
  while (dir !== dirname(dir)) {
    const file = join(dir, 'package.json');
    if (existsSync(file) && JSON.parse(readFileSync(file)).name === name) return file;
    dir = dirname(dir);
  }
  return null;
}

const queue = Object.keys(app.dependencies).filter(name => name !== 'vite').map(name => ({ name, from: join(root, 'package.json'), optional: false }));
const visited = new Map();
while (queue.length) {
  const { name, from, optional } = queue.shift();
  const file = findMetadata(name, from);
  if (!file) { if (optional) continue; throw new Error(`Installed dependency metadata missing: ${name}`); }
  const data = JSON.parse(readFileSync(file));
  const id = `${data.name}@${data.version}`;
  if (visited.has(id)) continue;
  const folder = dirname(file);
  const override = overrides.packages[id];
  const supplied = readdirSync(folder).filter(name => rootNotices.test(name) && statSync(join(folder, name)).isFile()).sort();
  const texts = supplied.map(name => ({ source: `npm:${id}/${name}`, text: normalize(readFileSync(join(folder, name), 'utf8')) }));
  if (!texts.length && override) {
    for (const source of override.files) texts.push({ source: source.url, text: normalize(readFileSync(join(root, 'public/licenses', source.path), 'utf8')) });
  }
  if (!texts.length) throw new Error(`No supplied or explicitly sourced license for ${id}; add a verified override.`);
  const repository = typeof data.repository === 'string' ? data.repository : data.repository?.url;
  visited.set(id, {
    id, name: data.name, version: data.version, declaredLicense: data.license || data.licenses,
    repository, author: data.author, contributors: data.contributors,
    clarification: override?.clarification, upstreamLicenseSources: override?.upstream,
    provenance: texts.map(entry => ({ source: entry.source, sha256: hash(entry.text) })),
    texts,
  });
  const optionalNames = new Set(Object.keys(data.optionalDependencies || {}));
  const dependencies = { ...data.dependencies, ...data.optionalDependencies, ...data.peerDependencies };
  for (const name of Object.keys(dependencies)) queue.push({ name, from: file, optional: optionalNames.has(name) || name in (data.peerDependencies || {}) });
}

const entries = [...visited.values()].sort((a, b) => a.id.localeCompare(b.id));
const banner = 'Motion Atlas runtime dependency licenses\n\nThis is a conservative closure of installed runtime dependencies, not a claim that every package survives bundler tree shaking. Package-supplied copyright and license texts are reproduced below. Missing upstream notices are identified explicitly; no copyright holder is invented.\n';
const sections = entries.map(entry => [
  '='.repeat(80), entry.id, `Declared license: ${typeof entry.declaredLicense === 'string' ? entry.declaredLicense : JSON.stringify(entry.declaredLicense)}`,
  entry.repository && `Repository: ${entry.repository}`,
  entry.author && `Author metadata (not a copyright assertion): ${typeof entry.author === 'string' ? entry.author : JSON.stringify(entry.author)}`,
  entry.contributors && `Contributor metadata: ${JSON.stringify(entry.contributors)}`,
  entry.clarification,
  ...entry.texts.flatMap(part => [`\nSource: ${part.source}\n`, part.text]),
].filter(Boolean).join('\n'));
writeFileSync(join(root, 'public/licenses/runtime-dependency-licenses.txt'), `${banner}\n${sections.join('\n\n')}\n`);
const manifest = entries.map(({ texts, ...entry }) => entry);
writeFileSync(join(root, 'public/licenses/runtime-dependencies.json'), `${JSON.stringify({ schemaVersion: 1, package: app.name, scope: 'installed runtime dependency closure, excluding Vite build tool', packages: manifest }, null, 2)}\n`);
const notice = `# Motion Atlas third-party notices\n\nOriginal application code is covered by [the repository MIT license](LICENSE). Third-party code, data and fonts keep their own terms.\n\n- Motion Prompt source demos and normalized catalogue data: copyright 2026 Shohei Ohtaki, MIT; pinned upstream revision 7819d3879eb7d5a1475c11c001bedffb5cab64af. [Upstream MIT](public/source/LICENSE), [upstream third-party notices](public/source/THIRD-PARTY-NOTICES.md). The X posts mentioned by upstream are not included.\n- Noto Sans SC Variable, Fontsource package 5.3.1 / Google Fonts v41: OFL-1.1, attribution Google Inc. [Complete font license](public/licenses/noto-sans-sc-OFL.txt). Distributed font bytes are unchanged.\n- GSAP 3.15.0 and @gsap/react 2.1.2: [GSAP Standard No Charge terms](public/licenses/GSAP-Standard-No-Charge-License.txt), not MIT. Existing source copyright/license headers are retained.\n- Four exact upstream packages omit standalone copyright/license text: @antv/event-emitter 0.1.3 (MIT), @antv/g-lite 2.7.2 (MIT), toggle-selection 1.0.6 (MIT), and @antv/util 2.0.17 (ISC). Their declarations and actual author/credit metadata are retained, alongside separately identified standard permission terms. The missing upstream notices are not claimed to have been recovered; util is not silently changed to a later MIT version. [Version-specific source record](public/licenses/license-overrides.json).\n- Other runtime dependencies: [complete package-specific texts](public/licenses/runtime-dependency-licenses.txt) and [version/provenance inventory](public/licenses/runtime-dependencies.json). The inventory includes ${entries.length} installed package-version pairs and may include code removed by tree shaking.\n\nWhere an exact published package declares a license but omits a standalone copyright or license text, the inventory identifies the source and preserves its actual author/credit fields. Standard permission text is identified as such, without inventing a copyright holder.\n\n[Asset provenance and hashes](public/licenses/asset-provenance.json) record source bytes and built fonts. This notice does not relicense any third-party material.\n`;
writeFileSync(join(root, 'THIRD-PARTY-NOTICES.md'), notice);
writeFileSync(join(root, 'public/licenses/THIRD-PARTY-NOTICES.md'), notice.replaceAll('](LICENSE)', '](application-MIT.txt)').replaceAll('](public/source/', '](../source/').replaceAll('](public/licenses/', ']('));
console.log(`Prepared complete license text sections for ${entries.length} installed runtime package versions.`);
