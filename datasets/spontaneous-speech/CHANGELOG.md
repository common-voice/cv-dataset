# Spontaneous Speech Changelog

## Major Changes (March 2026)

The following changes affect SPS datasets starting with Corpus 3.0.

The SPS bundler reached its first production release, nearing SCS counterpart's capabilities. It is a standalone CLI tool with per-locale pipeline. Key capabilities:

- **Release types**: `full`, `delta`, `variants` (stub for now), and `statistics` releases, controlled via CLI flags (`-t`, `-f`, `-u`, `-p`).
- **Delta releases**: produce archives containing only locales with new audio or new validation votes since the previous release. Locales with zero activity are automatically skipped.
- **Problem clip detection**: audio files that fail download or are too small (0-byte) are detected, logged, and excluded from the release.
- **Process logging**: each bundler run generates a structured TSV process log uploaded alongside the release artifacts.

### Datasheets

Each full release archive now includes a `README.md` datasheet per locale -- a Markdown document with language description, dataset statistics, and community-contributed context. Datasheets are generated using templates from the [cv-datasheets](https://github.com/common-voice/cv-datasheets) repository (schema v2.0.0). The datasheet is placed at the root of the locale directory:

```txt
sps-corpus-{version}-{YYYY-MM-DD}-{locale}/
├── README.md          <-- new: locale datasheet
├── audios/
├── ss-corpus-{locale}.tsv
├── ...
```

Datasheets are included in full releases only; delta releases omit them.

### QA Pipeline Integration

The SPS bundler now embeds the external Quality Control Data Pipeline which was run after a release, as a `PostProcessCorpus` step. This applies:

- **Disfluency standardization**: normalizes disfluency markers (`<disfluency>` tags) across all transcriptions.
- **Quality tagging**: flags clips with potential issues (e.g., `transcription-length`, `speech-rate`, `short-audio`, `long-audio`) in the `quality_tags` column.
- **QA summary**: generates a per-locale `ss-corpus-{locale}.qa-summary.json` with processing metrics (rows processed, disfluency application status, problem clip counts).

### SPS-SCS Data Bridge

The SPS bundler can cross-reference the Scripted Speech (SCS) database to enrich demographic data. User identity is bridged via `provider_id` (SPS) ↔ `client_id` (SCS). When a contributor has a profile on the classic Common Voice platform, their age, gender, and accent data from SCS is merged into the SPS release, with SCS profile data taking priority over SPS-recorded demographics.

### Accent and Variant Token System

Accents and language variants are stored as human-readable names in the TSV files, but as machine tokens in the statistics JSON. Each locale has a set of predefined accent/variant tokens; non-predefined values are grouped as `user_defined` in statistics. This enables consistent demographic analysis across releases.

### Bundler Optimizations

- **Conditional gzip compression**: full archives (containing MP3 audio) use compression level 1 (~3.5x faster); delta archives (text-heavy) use level 6.
- **Locale cleanup**: cached locale directories are removed after upload to prevent memory exhaustion.
- **`--force` flag**: skips GCS existence checks for crash recovery, allowing re-runs without re-uploading completed locales.
- **Dynamic progress logging**: targets ~5 log lines per batch regardless of batch size.

### Metadata Structure Changes

Starting with v3.0, the per-locale statistics JSON has the following structure differences from SCS (relevant for anyone processing statistics programmatically):

- `duration` is a nested object: `total_ms`, `total_hrs`, `validated_ms`, `validated_hrs`, `avg_ms`, `min_ms`, `max_ms`, `avg_chars_per_sec`.
- `buckets` contains per-split detail: `train`, `dev`, `test`, each with `clips`, `users`, `duration_ms`, `duration_hrs`.
- `demographics` replaces the SCS `splits` key, with `age`, `gender`, and `variant` breakdowns.
- SPS-specific objects: `questions`, `audios`, `transcriptions`, `reported` (with `reasons` breakdown).
- `generated_at` timestamp is included.

See the [SPS README](README.md) for the full statistics and TSV field documentation.

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
