# Font and Asset Packaging

Treat typography and visual assets as runtime engineering, not mood-board decoration.

## Assign font roles

Define only roles the product needs:

| Role | Typical content | Selection checks |
|---|---|---|
| Body/interface | Chinese or primary-language copy, labels, controls, long reading | Complete glyph coverage, readable UI metrics, needed 400/500/600 or variable range |
| Display/brand | English/Latin headlines, wordmarks, large editorial moments | Brand fit, restrained use, fallback metrics, required scripts |
| Numeric/data | Metrics, prices, timers, tables, charts | Tabular figures, stable widths, punctuation/currency/locale coverage |
| Code/technical | Code, paths, IDs, hashes, technical bilingual text | Monospace behavior, CJK width/coverage if needed, Regular/Bold distinction |
| Fallback | Unsupported scripts and loading failure | Available across target platforms, compatible metrics, explicit stack order |

One family may serve several roles when it does them well. Do not add a font merely to fill every row.

## Verify before adopting

- Read the exact font license. Prefer SIL OFL or another license that clearly permits intended redistribution and modification/conversion.
- Verify Chinese/multilingual glyph coverage, punctuation, symbols, currency, numerals, and project-specific names/terms.
- Package only weights/styles actually used. Choose a variable font when its support, size, and interpolation needs are beneficial.
- Prefer WOFF2 for modern Web delivery. Preserve upstream source/version, conversion method, and original license.
- Do not subset CJK or user-generated content to a guessed “common character” list. Subset only from a controlled corpus with an explicit missing-glyph strategy.
- Never assume Microsoft YaHei, PingFang, a developer font, or another machine-local font will exist on every target device.

## Load without layout surprises

- Use `font-display: swap` or `optional` according to the product's tolerance for late swaps.
- Preload only fonts required above the fold; excessive preload competes with critical content.
- Set stable fallback stacks and test layout before and after fonts resolve. Consider metric overrides when shifts are material.
- Use semantic font tokens/components rather than component-by-component family declarations.
- Confirm actual loading with `document.fonts.check(...)`, computed `font-family`, network/resource logs, and screenshots containing real target-language text.
- Check Regular, Medium, Bold, italic, tabular numerals, long paths/IDs, and missing glyphs rather than verifying one headline.

## Package for portability and offline use

- Default to packaged, clearly redistributable fonts for essential body/interface, display, data, and code roles in offline or portable deliverables. A system stack remains the final fallback, not the primary plan.
- If a full CJK face creates an unacceptable size cost, quantify that cost and present the tradeoff before changing the delivery promise. Do not silently replace packaged coverage with Microsoft YaHei, PingFang, or another platform-dependent primary face.
- Self-host runtime fonts and essential assets for offline/portable work. Do not call Google Fonts or another font CDN at runtime.
- Make asset paths compatible with the actual delivery mechanism. Root-absolute `/assets/...` paths usually fail when a built page is opened directly with `file://`; verify the emitted artifact.
- Distinguish source checkout, built folder, and direct-open entry. Check in the built artifact only when the project's distribution policy calls for it.
- If a single-file deliverable is required, inline only what is safe and practical; keep large replaceable data/assets external when the contract allows, and document the relationship.
- Do not register a service worker solely to disguise an artifact that is not genuinely offline; caching is not the same as packaged availability.

## Record provenance

For distributed fonts/assets, retain a machine-readable manifest when practical with:

- Family/asset name and project role.
- Upstream owner, official source URL, version/release/commit, and retrieval date.
- Original filename and distributed filename.
- Format conversion or subsetting method.
- SHA-256 of the distributed bytes.
- License identifier, license file path, attribution/copyright, and modification notice.
- Included weights/styles/scripts and known coverage limits.

Keep human-readable third-party notices for direct runtime dependencies and distributed fonts/assets. Include complete required license texts in the final package, not only the source tree. Re-generate or validate notices against the lockfile before release.

## Images, icons, illustrations, and brand assets

- Prefer supplied brand assets and official brand kits; preserve proportions, clear space, color restrictions, and license.
- Use one icon family for product UI. Do not invent brand logos or mix visual grammars to fill gaps.
- Generate original imagery only when it serves the brief and the image-generation Skill is available. Record that it is generated when provenance matters.
- For third-party imagery, verify usage/redistribution rights and retain attribution where required.
- Use responsive dimensions/formats, reserve aspect ratio to prevent layout shift, lazy-load below-fold media, and provide meaningful alt text or an empty alt for decorative media.
- Package essential raster/SVG/video/model/environment-map assets locally for offline work and provide a lightweight fallback for optional heavy media.

## Build-time validation

Validate the final artifact for:

- Missing files and wrong relative paths.
- Remote runtime `src`, `href`, CSS `url()`, dynamic imports, and fetches.
- Font hashes, manifest entries, license texts, and actual CSS references.
- Stale or unused fonts/assets left in the distributed package.
- Production dependency inventory aligned with the lockfile.
- Secrets or private data accidentally embedded in client output.

Use `scripts/frontend_preflight.py` for a first pass, then confirm with the browser's network/resource view. Static scanning cannot prove what the browser actually loaded.
