# Bundled font notices

Every font shipped with the showcase is open-source and remains licensed under the SIL Open Font License 1.1 (OFL-1.1), not UI Done's root MIT License. The complete license text is distributed beside the fonts in [`OFL-1.1.txt`](./OFL-1.1.txt).

No font is requested from a CDN at runtime. Latin font binaries are local copies from the official [Google Fonts repository](https://github.com/google/fonts). The Chinese families are the unmodified WOFF2 unicode-range files selected from official Google Fonts CSS for the fixed showcase character corpus; their exact CSS queries, upstream file URLs, local hashes, and corpus hash are recorded in [`cjk-showcase.manifest.json`](./cjk-showcase.manifest.json).

## Copyright notices

- `Outfit-Variable.ttf`: Copyright 2021 The Outfit Project Authors (https://github.com/Outfitio/Outfit-Fonts)
- `RedHatMono-Variable.ttf`: Copyright 2024 The Red Hat Project Authors (https://github.com/RedHatOfficial/RedHatFont)
- `BigShoulders-Variable.ttf`: Copyright 2019 The Big Shoulders Project Authors (https://github.com/xotypeco/big_shoulders)
- `CormorantGaramond-Variable.ttf`: Copyright 2015 the Cormorant Project Authors (https://github.com/CatharsisFonts/Cormorant)
- `Syne-Variable.ttf`: Copyright 2017 The Syne Project Authors (https://gitlab.com/bonjour-monde/fonderie/syne-typeface)
- `Fraunces-Variable.ttf`: Copyright 2018 The Fraunces Project Authors (https://github.com/undercasetype/Fraunces)
- `BodoniModa-Variable.ttf`: Copyright 2020 The Bodoni Moda Project Authors (https://github.com/indestructible-type/Bodoni)
- `ChakraPetch-SemiBold.ttf`: Copyright 2018 The Chakra Petch Project Authors (https://github.com/m4rc1e/Chakra-Petch.git)
- `Archivo-Variable.ttf`: Copyright 2020 The Archivo Project Authors (https://github.com/Omnibus-Type/Archivo)
- `noto-sans-sc/`: Copyright 2014-2021 Adobe (http://www.adobe.com/), with Reserved Font Name "Source"
- `noto-serif-sc/`: Copyright 2012 Google Inc. All Rights Reserved.
- `zcool-qingke/`: Copyright 2018 The ZCOOL QingKe HuangYou Project Authors (https://www.github.com/googlefonts/zcool-qingke-huangyou)

The local filenames were shortened for this repository. The Latin font bytes and internal names were not changed. The WOFF2 files were selected by their upstream unicode ranges and were not rewritten; unused upstream ranges are simply not distributed.

Exact local SHA-256 values, upstream paths, and packaging details are also summarized in the repository's [`THIRD_PARTY_NOTICES.md`](../../../THIRD_PARTY_NOTICES.md). Keep this file, `OFL-1.1.txt`, and the CJK manifest with the fonts when redistributing the showcase.
