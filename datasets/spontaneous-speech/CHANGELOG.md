# Spontaneous Speech (SPS) Changelog

## Dataset Changes in Corpus 3.0

The following changes affect SPS datasets starting with Corpus 3.0. For bundler internals, see the [SPS Bundler documentation](https://github.com/common-voice/spontaneous-speech/tree/main/spontaneous-speech-bundler).

### New files in archive

- **Datasheets**: each locale archive now includes a `README.md` datasheet with language description, statistics, and community context (generated from [cv-datasheets](https://github.com/common-voice/cv-datasheets), schema v2.0.0). Full releases only.
- **QA summary**: `ss-corpus-{locale}.qa-summary.json` with processing metrics per locale.

### TSV field changes

- added `age`, `gender`, `accents`, `variant` columns -- demographics are cross-referenced from SCS profiles when the contributor has one, with SCS data taking priority
- added `char_per_sec` column -- characters per second of transcription relative to audio duration
- added `quality_tags` column -- pipe-separated quality flags (see [Quality Tags](README.md#quality-tags) in the README)
- disfluency markers in `transcription` are now standardized to `[disfluency]` tags

### Statistics structure

The per-locale statistics JSON differs from SCS (relevant for programmatic consumers):

- `duration` is a nested object: `total_ms`, `total_hrs`, `validated_ms`, `validated_hrs`, `avg_ms`, `min_ms`, `max_ms`, `avg_chars_per_sec`
- `buckets` contains per-split detail: `train`, `dev`, `test`, each with `clips`, `users`, `duration_ms`, `duration_hrs`
- `demographics` replaces the SCS `splits` key, with `age`, `gender`, `accent`, and `variant` breakdowns
- SPS-specific objects: `questions`, `audios`, `transcriptions`, `reported` (with `reasons` breakdown)
- accents and variants use machine tokens in statistics; non-predefined values are grouped as `user_defined`
- `generated_at` timestamp is included

## Current Release

### [Corpus 3.0](sps-corpus-3.0-2026-03-09.json)

- **Date released**: 18 March 2026
- **Clip cut-off date**: 09 March 2026
- **Total hours**: 508
- **Total validated hours**: 269
- **Number of languages**: 72

**New languages since last release**: Danish (`da`), Esperanto (`eo`), Croatian (`hr`), Javanese (`jv`), Dutch (`nl`), Pashto (`ps`), Rakhine (`rki`), Sinhala (`si`), Sundanese (`su`), Tudaga (`tuq`)

## Past Releases

### [Corpus 2.0](sps-corpus-2.0-2025-12-05.json)

- **Date released**: 17 December 2025
- **Clip cut-off date**: 05 December 2025
- **Total hours**: 454
- **Total validated hours**: 268
- **Number of languages**: 62

**New languages since last release**: Spanish (`es`), Tashlhiyt (`shi`), Shona (`sn`), Thai (`th`)

### [Corpus 1.0](sps-corpus-1.0-2025-09-05.json)

First Spontaneous Speech release.

- **Date released**: 17 September 2025
- **Clip cut-off date**: 05 September 2025
- **Total hours**: 428
- **Total validated hours**: 263
- **Number of languages**: 58

**Languages**: Arvanitika (`aat`), Adyghe (`ady`), Gheg Albanian (`aln`), Aragonese (`an`), Bashkir (`ba`), Basaa (`bas`), Betawi (`bew`), Breton (`br`), Bodo (`brx`), Sabah Bisaya (`bsy`), Bukusu (`bxk`), Catalan (`ca`), Eastern Min (`cdo`), Chiga (`cgg`), Heng Hua (`cpx`), Welsh (`cy`), German (`de`), Cypriot Greek (`el-CY`), English (`en`), French (`fr`), Frisian (`fy-NL`), Irish (`ga-IE`), Galician (`gl`), Alsatian (`gsw`), Manx (`gv`), Gorani (`hac`), Wixarika (`hch`), Georgian (`ka`), Kabardian (`kbd`), Nubi (`kcn`), Konzo (`koo`), Kelabit (`kzi`), Lendu (`led`), Ligurian (`lij`), Kenyi (`lke`), Thur (`lth`), Latvian (`lv`), Mixteco Yucuhiti (`meh`), Melanau (`mel`), Michoacan Mazahua (`mmc`), Sabah Malay (`msi`), Bahasa Malay (`ms-MY`), Western Penan (`pne`), Puno Quechua (`qxp`), Russian (`ru`), Ruuli (`ruc`), Amba (`rwm`), Scots (`sco`), Serian Bidayuh (`sdo`), Sena (`seh`), Sa'ban (`snv`), Toba Qom (`tob`), Papantla Totonac (`top`), Turkish (`tr`), Rutoro (`ttj`), Kuku (`ukv`), Ushojo (`ush`), Kenyah (`xkl`)
