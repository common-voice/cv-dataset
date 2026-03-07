# CV Dataset Helper Scripts

This directory contains helper scripts for processing and analyzing Common Voice dataset statistics.

## Dataset Types

- `scripted-speech` — Classic Common Voice (SCS)
- `spontaneous-speech` — Spontaneous Speech (SPS)
- `code-switching` — Code Switching (CS, not yet implemented)

## Shared Module

[`common.js`](common.js) contains shared constants and utilities used by all helpers:

- `DATASET_TYPES` — list of valid dataset types
- `buildFilePath` / `buildFolderPath` — path builders for `datasets/<type>/`
- `getLocaleFromFilename` — extracts locale from `stats_{locale}.json`
- `validateDatasetType` — validates and throws on unknown types

## Commands

All commands follow the pattern: `node helpers/<script> <dataset-type> <arguments>`

The scripts automatically:

- Prefix paths with `datasets/<dataset-type>/`
- Add `.json` extension if missing

---

### createStats.js

Aggregate statistics from individual locale files into a complete dataset statistics file.

**Usage:**

```bash
node helpers/createStats.js <dataset-type> <stats-folder>
```

**Examples:**

```bash
node helpers/createStats.js scripted-speech stats-23.0 | jq . > datasets/scripted-speech/cv-corpus-23.0-2025-09-05.json
node helpers/createStats.js spontaneous-speech stats-sps-2.0 | jq . > datasets/spontaneous-speech/sps-corpus-2.0-2026-03-05.json
```

**What it does:**

- Reads individual locale statistics from a folder
- Normalizes age and gender splits by number of clips (SCS: `splits.age/gender`, SPS: `demographics.age/gender`)
- Aggregates data across all locales
- Outputs complete statistics with totals

---

### compareReleases.js

Compare statistics between two dataset releases and calculate differences.

**Usage:**

```bash
node helpers/compareReleases.js <dataset-type> <dataset-1> <dataset-2> [output-file]
```

**Example:**

```bash
node helpers/compareReleases.js scripted-speech cv-corpus-24.0-2025-12-05 cv-corpus-23.0-2025-09-05
node helpers/compareReleases.js spontaneous-speech sps-corpus-3.0-2026-03-05 sps-corpus-2.0-2026-01-15
```

**What it does:**

- Compares two dataset releases (works for both SCS and SPS)
- Calculates delta and percentage changes for each top-level numeric metric
- Identifies new and removed languages
- Outputs statistics to console or file

---

### createDeltaStatistics.js

Create delta statistics showing the differences between two releases.

**Usage:**

```bash
node helpers/createDeltaStatistics.js <dataset-type> <dataset-1> <dataset-2> [output-file]
```

**Example:**

```bash
node helpers/createDeltaStatistics.js scripted-speech cv-corpus-24.0-2025-12-05 cv-corpus-23.0-2025-09-05
node helpers/createDeltaStatistics.js spontaneous-speech sps-corpus-3.0-2026-03-05 sps-corpus-2.0-2026-01-15
```

**What it does:**

- Generates delta statistics between two releases
- Shows absolute differences for each metric
- Lists new and removed languages
- Calculates total statistics across all locales (SCS: `totalDuration/totalValidDurationSecs`, SPS: `totalDurationMs/totalValidDurationMs`)

---

### recalculateStats.js

Recalculate and verify total statistics from a dataset file.

**Usage:**

```bash
node helpers/recalculateStats.js <dataset-type> <dataset>
```

**Example:**

```bash
node helpers/recalculateStats.js scripted-speech cv-corpus-24.0-2025-12-05
node helpers/recalculateStats.js spontaneous-speech sps-corpus-2.0-2026-01-15
```

**What it does:**

- Reads a dataset statistics file
- Recalculates total duration, valid duration, hours, and valid hours
- Verifies statistics integrity
- Outputs recalculated totals

---

## Notes

- All file paths are relative to the `datasets/<dataset-type>/` directory
- The `.json` extension is optional in command arguments
- Each command displays usage information when run
- SCS and SPS stats have different field structures — the handlers map to the correct fields for each type
