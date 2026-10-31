import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, '../../showcase/motion-atlas');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const fontRoot = join(root, 'node_modules/@fontsource-variable/noto-sans-sc');
const originals = new Map(readdirSync(join(fontRoot, 'files')).filter(name => name.endsWith('.woff2')).map(name => [hash(readFileSync(join(fontRoot, 'files', name))), name]));
const fonts = readdirSync(join(output, 'assets')).filter(name => name.endsWith('.woff2')).map(name => {
  const bytes = readFileSync(join(output, 'assets', name));
  const sha256 = hash(bytes);
  const original = originals.get(sha256);
  if (!original) throw new Error(`Built font bytes have no exact upstream match: ${name}`);
  return { path: `assets/${name}`, original, sha256, bytes: bytes.length };
});
const demos = readdirSync(join(root, 'public/source')).map(name => {
  const bytes = readFileSync(join(root, 'public/source', name));
  const upstream = name === 'assets_runtime.js' ? 'assets/runtime.js' : name.startsWith('packs_') ? `packs/${name.slice(6, -8)}/pack.js` : name;
  return { path: `source/${name}`, upstream, sha256: hash(bytes), bytes: bytes.length };
});
const catalog = JSON.parse(readFileSync(join(root, 'src/catalog-data.json')));
const metadata = JSON.parse(readFileSync(join(fontRoot, 'metadata.json')));
const manifest = {
  schemaVersion: 1,
  motionPrompt: { repository: 'https://github.com/showheyohtaki/motion-prompt', revision: '7819d3879eb7d5a1475c11c001bedffb5cab64af', license: 'MIT', copyright: 'Copyright (c) 2026 Shohei Ohtaki', files: demos },
  catalogue: { source: 'Motion Prompt catalog.json', sourceVersion: '1.6950972783', path: 'src/catalog-data.json', entries: catalog.items.length, packs: catalog.packs.length, sha256: hash(readFileSync(join(root, 'src/catalog-data.json'))), adaptation: 'Selected original multilingual/specification fields normalized for the React gallery; per-item representative poster times added.' },
  fonts: { package: '@fontsource-variable/noto-sans-sc', packageVersion: JSON.parse(readFileSync(join(fontRoot, 'package.json'))).version, fontVersion: metadata.version, upstream: metadata.source, license: 'OFL-1.1', attribution: metadata.license.attribution, modification: 'None; exact package WOFF2 bytes copied by Vite with hashed filenames.', weightAxis: metadata.variable.wght, files: fonts },
};
const text = `${JSON.stringify(manifest, null, 2)}\n`;
writeFileSync(join(root, 'public/licenses/asset-provenance.json'), text);
writeFileSync(join(output, 'licenses/asset-provenance.json'), text);
copyFileSync(join(root, 'LICENSE'), join(output, 'licenses/application-MIT.txt'));
console.log(`Verified and documented ${fonts.length} exact font matches and ${demos.length} demo/license source files.`);
