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

## Showcase screenshots

The seven JPEG files under `assets/readme/` are browser screenshots of this repository's own `gallery`, `signal-room`, `brief-machine`, `source-atlas`, `viewport-lab`, `motion-foundry`, and `open-studio` pages. The pages use project-authored layout, copy, CSS, programmatic Canvas drawing, and programmatic 3D geometry; the screenshots are not stock photographs and contain no separately downloaded image asset.

The screenshots visually include output rendered by the open-source runtime packages listed above. Those packages remain governed by their own licenses even when their rendered output appears inside a screenshot. The screenshots do not claim sponsorship or endorsement by the named upstream projects.

## Project license scope

Unless otherwise noted, the repository's project-authored Skill files, scripts, documentation, showcase source code, screenshots, and original interface artwork are licensed under the [MIT License](./LICENSE).

The bundled runtime libraries and font files are excluded from the project's root MIT License and remain under their respective MIT, Apache-2.0, 0BSD, ISC, and OFL-1.1 terms. References to Google Fonts, IBM, Red Hat, and the listed open-source projects identify sources and rights holders only; they do not imply sponsorship or endorsement.
