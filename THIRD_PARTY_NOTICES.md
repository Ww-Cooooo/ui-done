# Third-party notices

This file records material in the repository that is not covered solely by the root MIT License, together with the provenance of the generated showcase images. The inventory was last checked on 2026-08-16.

## Bundled showcase runtime

The prebuilt files under `showcase/shared/runtime/` contain code from the production packages below. They run locally in the showcase pages; the pages do not fetch these libraries from a CDN. Each package remains under its own license rather than the project's root MIT License.

| Role | Package and bundled version | License |
| --- | --- | --- |
| Interface runtime | React 19.2.8, React DOM 19.2.8, Scheduler 0.27.0 | MIT |
| Motion | Motion 12.42.2, Framer Motion 12.43.0, Motion DOM 12.43.0, Motion Utils 12.39.0, tslib 2.8.1 | MIT, except tslib under 0BSD |
| Smooth scrolling | Lenis 1.3.25 | MIT |
| 3D | Three.js 0.185.1 | MIT |
| Charts | Chart.js 4.5.1, @kurkle/color 0.3.4 | MIT |
| Icons | Phosphor Icons for React 2.1.10 | MIT |
| Viewport-aware loading | react-intersection-observer 9.16.0 | MIT |

The complete copyright notices and exact license texts taken from the installed production packages are distributed with the bundles in [`showcase/shared/runtime/THIRD_PARTY_LICENSES.txt`](./showcase/shared/runtime/THIRD_PARTY_LICENSES.txt). `pnpm run notices` regenerates that file from the dependency tree pinned in `pnpm-lock.yaml`. Keep it with the JavaScript bundles when copying or redistributing the prebuilt showcase runtime.

## Bundled fonts

The five font binaries under `showcase/shared/fonts/` are unmodified copies from the [Google Fonts repository at commit `352f6b7d9d6cc4fa9e242b931291d31b21a6dc84`](https://github.com/google/fonts/commit/352f6b7d9d6cc4fa9e242b931291d31b21a6dc84). Their bytes and embedded metadata were compared with that snapshot. The three variable-font filenames were shortened for this repository; the font data and internal font names were not changed.

All five files remain licensed under the SIL Open Font License 1.1 (OFL-1.1), not the root MIT License. The complete OFL-1.1 text is distributed at [`showcase/shared/fonts/OFL-1.1.txt`](./showcase/shared/fonts/OFL-1.1.txt). The required copyright notices are also kept beside the binaries in [`showcase/shared/fonts/FONT_NOTICES.md`](./showcase/shared/fonts/FONT_NOTICES.md), so they remain with the font folder if it is copied separately.

| Font | Version | Upstream file | Local file | SHA-256 |
| --- | --- | --- | --- | --- |
| Outfit | 1.100 | [`Outfit[wght].ttf`](https://github.com/google/fonts/blob/352f6b7d9d6cc4fa9e242b931291d31b21a6dc84/ofl/outfit/Outfit%5Bwght%5D.ttf) | `Outfit-Variable.ttf` | `fc7287273e66929776e2ba54f144fe699080bec29f61bf649d70d871468aeade` |
| IBM Plex Serif | 2.6 | [`IBMPlexSerif-Regular.ttf`](https://github.com/google/fonts/blob/352f6b7d9d6cc4fa9e242b931291d31b21a6dc84/ofl/ibmplexserif/IBMPlexSerif-Regular.ttf) | `IBMPlexSerif-Regular.ttf` | `e882efa9c41949a528ac2369079ec5ef050c1c996bbd0bacce3c3326d44cf80d` |
| IBM Plex Serif | 2.6 | [`IBMPlexSerif-Bold.ttf`](https://github.com/google/fonts/blob/352f6b7d9d6cc4fa9e242b931291d31b21a6dc84/ofl/ibmplexserif/IBMPlexSerif-Bold.ttf) | `IBMPlexSerif-Bold.ttf` | `534c02c295999dd86e770457ece1d43db0de9256dd98bf741426f63ae904209e` |
| Red Hat Mono | 1.030 | [`RedHatMono[wght].ttf`](https://github.com/google/fonts/blob/352f6b7d9d6cc4fa9e242b931291d31b21a6dc84/ofl/redhatmono/RedHatMono%5Bwght%5D.ttf) | `RedHatMono-Variable.ttf` | `253377ac29ccce89cb1b5fb297c69812ffe993b0c436322b3656323ff30fd14f` |
| Big Shoulders | 2.002 | [`BigShoulders[opsz,wght].ttf`](https://github.com/google/fonts/blob/352f6b7d9d6cc4fa9e242b931291d31b21a6dc84/ofl/bigshoulders/BigShoulders%5Bopsz%2Cwght%5D.ttf) | `BigShoulders-Variable.ttf` | `4b4b24aa6f799aa73cdcd5b6fa840cbcbbb38b81fa9fa82c25126a4530c1ba44` |

Upstream copyright statements:

- Outfit: Copyright 2021 The Outfit Project Authors (https://github.com/Outfitio/Outfit-Fonts)
- IBM Plex Serif: Copyright © 2017 IBM Corp. with Reserved Font Name "Plex"
- Red Hat Mono: Copyright 2024 The Red Hat Project Authors (https://github.com/RedHatOfficial/RedHatFont)
- Big Shoulders: Copyright 2019 The Big Shoulders Project Authors (https://github.com/xotypeco/big_shoulders)

The corresponding upstream OFL notices are available for [Outfit](https://github.com/google/fonts/blob/352f6b7d9d6cc4fa9e242b931291d31b21a6dc84/ofl/outfit/OFL.txt), [IBM Plex Serif](https://github.com/google/fonts/blob/352f6b7d9d6cc4fa9e242b931291d31b21a6dc84/ofl/ibmplexserif/OFL.txt), [Red Hat Mono](https://github.com/google/fonts/blob/352f6b7d9d6cc4fa9e242b931291d31b21a6dc84/ofl/redhatmono/OFL.txt), and [Big Shoulders](https://github.com/google/fonts/blob/352f6b7d9d6cc4fa9e242b931291d31b21a6dc84/ofl/bigshoulders/OFL.txt).

## Generated showcase images

The following six source images were generated specifically for this repository with OpenAI ImageGen. They were not downloaded from a stock-image site or third-party image library.

| File | SHA-256 |
| --- | --- |
| `showcase/aer-run/assets/aer-run-detail.webp` | `bb5d38858bd90c11f28e0187cd669117f282a28b24943e0fe1e1c20c20b0dd9b` |
| `showcase/aer-run/assets/aer-run-shoe.webp` | `d919e5a6e5d318c5cfd4362c3240f39dd91a399254b1d7af1a2714bd0c2fc30e` |
| `showcase/form-shift/assets/installation-detail.webp` | `fd62f37129ab66f00c57c06f2693bb6f6450ccf0eb850b483a40271de4ab0832` |
| `showcase/form-shift/assets/kinetic-installation.webp` | `1a5cc3d14cfdc607c56396f9253db197f0dc320d74bf736cc3631ceb4947d5fb` |
| `showcase/tide-journal/assets/coastal-observatory.webp` | `87f894822d34bdab4935a6793c9de9a653cdebe76a77e112ecc6f54c01ccd422` |
| `showcase/tide-journal/assets/observatory-detail.webp` | `0e23d9768278440aaad2da11570ecae9a1ae7cbb4e5ef0c26360879b1574573e` |

The seven JPEG files under `assets/readme/` are screenshots of this repository's own showcase pages. Some include the generated source images listed above; the newer dashboard, retail, and mobile-app examples use project-authored HTML and CSS artwork instead. None of these JPEG files is a separate third-party photograph.

A manual review on 2026-08-15 found no recognizable third-party logo, watermark, person, signature, or brand name in these thirteen image files. The files contain no embedded EXIF copyright, author, comment, or software fields. This is a good-faith repository review, not a guarantee that a generated image is unique or a trademark clearance in every jurisdiction.

[OpenAI's Terms of Use](https://openai.com/policies/terms-of-use/) state that, as between the user and OpenAI and to the extent permitted by applicable law, the user owns the output; they also state that output may not be unique. The repository therefore offers these generated images under the MIT License only to the extent the project has rights it can license. It does not claim exclusivity, guaranteed copyrightability, or guaranteed non-infringement for AI-generated output.

## Fictional showcase names

`AER Run`, `Tide Journal`, `Form Shift`, `Control Room`, `Corner Store`, and `Pocket Planner` are labels for fictional demonstration pages. They do not represent real products, publications, events, or endorsements. Similar names may exist elsewhere; this repository makes no claim that these demonstration labels are exclusive or cleared as trademarks for commercial use.

## Project license scope

Unless otherwise noted, the repository's project-authored Skill files, scripts, documentation, showcase source code, and original interface artwork are licensed under the [MIT License](./LICENSE). The generated images are included only within the rights scope described above.

The bundled runtime libraries and font files are excluded from the project's root MIT License and remain under their respective MIT, 0BSD, and OFL-1.1 terms. References to OpenAI, Google Fonts, IBM, Red Hat, and the listed open-source projects identify sources and rights holders only; they do not imply sponsorship or endorsement.
