# Third-party notices

This file records material in the repository that is not covered solely by the root MIT License, together with the provenance boundary of the local showcase screenshots. The inventory was last checked on 2026-09-02.

## Bundled showcase runtime

The prebuilt files under `showcase/shared/runtime/` contain code from the production packages below. They run locally in the showcase pages; the pages do not fetch these libraries from a CDN. Each package remains under its own license rather than the project's root MIT License.

| Role | Package and bundled version | License |
| --- | --- | --- |
| Interface runtime | React 19.2.8, React DOM 19.2.8, Scheduler 0.27.0 | MIT |
| UI components and icons | Ant Design 6.6.2, Ant Design Icons 6.3.4 | MIT |
| Motion and smooth scrolling | Anime.js 4.5.0, Lenis 1.3.26 | MIT |
| 3D/WebGL | Three.js 0.185.1, React Three Fiber 9.7.0 | MIT |
| 2D Canvas | Pts 0.12.9 | Apache-2.0 |
| Visualization | AntV G2 5.4.8 | MIT |

The complete copyright notices and exact license texts taken from the installed production packages are distributed with the bundles in [`showcase/shared/runtime/THIRD_PARTY_LICENSES.txt`](./showcase/shared/runtime/THIRD_PARTY_LICENSES.txt). `pnpm run notices` regenerates that file from the dependency tree pinned in `pnpm-lock.yaml`. Keep it with the JavaScript bundles when copying or redistributing the prebuilt showcase runtime.

## Bundled fonts

The showcase deliberately uses twelve open-source font families rather than browser or operating-system defaults. All remain licensed under the SIL Open Font License 1.1 (OFL-1.1), not the root MIT License. The complete license is distributed at [`showcase/shared/fonts/OFL-1.1.txt`](./showcase/shared/fonts/OFL-1.1.txt), and copyright statements stay beside the files in [`showcase/shared/fonts/FONT_NOTICES.md`](./showcase/shared/fonts/FONT_NOTICES.md).

Outfit, Red Hat Mono, and Big Shoulders remain byte-identical to the previously recorded [Google Fonts snapshot](https://github.com/google/fonts/commit/352f6b7d9d6cc4fa9e242b931291d31b21a6dc84). The six additional Latin binaries were retrieved from their official Google Fonts repository paths on 2026-09-02 and were not modified. Filenames were shortened locally without changing internal font names.

| Font | Upstream file | Local file | SHA-256 |
| --- | --- | --- | --- |
| Outfit | [`Outfit[wght].ttf`](https://github.com/google/fonts/blob/352f6b7d9d6cc4fa9e242b931291d31b21a6dc84/ofl/outfit/Outfit%5Bwght%5D.ttf) | `Outfit-Variable.ttf` | `fc7287273e66929776e2ba54f144fe699080bec29f61bf649d70d871468aeade` |
| Red Hat Mono | [`RedHatMono[wght].ttf`](https://github.com/google/fonts/blob/352f6b7d9d6cc4fa9e242b931291d31b21a6dc84/ofl/redhatmono/RedHatMono%5Bwght%5D.ttf) | `RedHatMono-Variable.ttf` | `253377ac29ccce89cb1b5fb297c69812ffe993b0c436322b3656323ff30fd14f` |
| Big Shoulders | [`BigShoulders[opsz,wght].ttf`](https://github.com/google/fonts/blob/352f6b7d9d6cc4fa9e242b931291d31b21a6dc84/ofl/bigshoulders/BigShoulders%5Bopsz%2Cwght%5D.ttf) | `BigShoulders-Variable.ttf` | `4b4b24aa6f799aa73cdcd5b6fa840cbcbbb38b81fa9fa82c25126a4530c1ba44` |
| Cormorant Garamond | [`CormorantGaramond[wght].ttf`](https://github.com/google/fonts/blob/main/ofl/cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf) | `CormorantGaramond-Variable.ttf` | `b20b7d9626dd956b2c5e558692ad328b1f19e3275e2782db4fa07670d83f35e0` |
| Syne | [`Syne[wght].ttf`](https://github.com/google/fonts/blob/main/ofl/syne/Syne%5Bwght%5D.ttf) | `Syne-Variable.ttf` | `ce5ac77142a65cab2248a1a2ebb740b1d4d9c20b52488877d3ff664d1356104a` |
| Fraunces | [`Fraunces[SOFT,WONK,opsz,wght].ttf`](https://github.com/google/fonts/blob/main/ofl/fraunces/Fraunces%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf) | `Fraunces-Variable.ttf` | `177ff6c0f14e5550a3c624247cd1189611d4eb65d000b14944c63d967958abbb` |
| Bodoni Moda | [`BodoniModa[opsz,wght].ttf`](https://github.com/google/fonts/blob/main/ofl/bodonimoda/BodoniModa%5Bopsz%2Cwght%5D.ttf) | `BodoniModa-Variable.ttf` | `550f5e34ee0a828d7941b1fe9bc58b34e5260d3f33a61532e6d0a0114e79a5cf` |
| Chakra Petch | [`ChakraPetch-SemiBold.ttf`](https://github.com/google/fonts/blob/main/ofl/chakrapetch/ChakraPetch-SemiBold.ttf) | `ChakraPetch-SemiBold.ttf` | `45264de3204ddbd5fb3e14a2402acd5c630d16650ae5fc221d2c52da46a6734b` |
| Archivo | [`Archivo[wdth,wght].ttf`](https://github.com/google/fonts/blob/main/ofl/archivo/Archivo%5Bwdth%2Cwght%5D.ttf) | `Archivo-Variable.ttf` | `0e094a7d3c7c4c25cf1310c4b30014f1dae9332220b1c2c88f4fa996f0b05053` |

Noto Sans SC, Noto Serif SC, and ZCOOL QingKe HuangYou are packaged as the official Google Fonts WOFF2 unicode-range files needed by the fixed showcase corpus. Unused upstream ranges are omitted; the selected WOFF2 bytes are unchanged. The selection corpus SHA-256 is `f4fe555fda901f767ed054eea33fa26c02788ad94d807a2a6b412cc01c799acd`.

| Font | Selected files | Local bytes | Packaging record |
| --- | ---: | ---: | --- |
| Noto Sans SC | 25 | 1,394,388 | [`cjk-showcase.manifest.json`](./showcase/shared/fonts/cjk-showcase.manifest.json) |
| Noto Serif SC | 25 | 1,825,024 | [`cjk-showcase.manifest.json`](./showcase/shared/fonts/cjk-showcase.manifest.json) |
| ZCOOL QingKe HuangYou | 25 | 1,175,328 | [`cjk-showcase.manifest.json`](./showcase/shared/fonts/cjk-showcase.manifest.json) |

The generated local `@font-face` sheet has SHA-256 `42055c57ecd5bd9e742c42ce02c9d42c2a77576996c043578a80d98a5e2711d3`. It contains only local paths, so the showcase makes no font request to Google at runtime.

## Showcase imagery and screenshots

The 30 WebP assets under `showcase/assets/<style>/` were generated specifically for this repository with OpenAI's image-generation tool. They are not third-party stock photographs. Prompt directions, processing steps, depicted-content boundaries, and the real image-luminance values used by AntV are recorded in [`showcase/assets/IMAGE_NOTICES.md`](./showcase/assets/IMAGE_NOTICES.md).

The eleven JPEG files under `assets/readme/` are browser screenshots of this repository's own gallery and ten visual concept pages. The screenshots combine the generated local imagery with project-authored layout, copy, CSS, programmatic Canvas drawing, and programmatic 3D geometry. They do not claim that the depicted people, products, places, or organizations are real, and they do not imply sponsorship or endorsement by OpenAI or any named open-source project.

The screenshots visually include output rendered by the open-source runtime packages and fonts listed above. Those components remain governed by their own licenses even when their rendered output appears inside a screenshot.

## Project license scope

Unless otherwise noted, the repository's project-authored Skill files, scripts, documentation, showcase source code, screenshots, and original interface artwork are licensed under the [MIT License](./LICENSE).

The bundled runtime libraries and font files are excluded from the project's root MIT License and remain under their respective MIT, Apache-2.0, 0BSD, ISC, and OFL-1.1 terms. References to Google Fonts, IBM, Red Hat, and the listed open-source projects identify sources and rights holders only; they do not imply sponsorship or endorsement.
