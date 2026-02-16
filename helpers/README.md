# CV Dataset Helper Scripts

This directory contains helper scripts for processing and analyzing Common Voice dataset statistics.

## Dataset Types

### Supported

- `scripted-speech` - Ready for use

### Not Yet Implemented

- `spontaneous-speech` - Coming soon
- `code-switching` - Coming later

## Commands

All commands follow the pattern: `node helpers/<script> <dataset-type> <arguments>`

The scripts automatically:

- Prefix paths with `datasets/<dataset-type>/`
- Add `.json` extension if missing

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
node helpers/compareReleases.js scripted-speech cv-corpus-24.0-2025-12-05 cv-corpus-23.0-2025-09-05 comparison-report
```

**What it does:**

- Compares two dataset releases
- Calculates delta and percentage changes for each metric
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
node helpers/createDeltaStatistics.js scripted-speech cv-corpus-24.0-2025-12-05 cv-corpus-23.0-2025-09-05 delta-report
```

**What it does:**

- Generates delta statistics between two releases
- Shows absolute differences for each metric
- Lists new and removed languages
- Calculates total statistics across all locales

---

### createStats.js

Aggregate statistics from individual locale files into a complete dataset statistics file.

**Usage:**

```bash
node helpers/createStats.js <dataset-type> <stats-folder>
```

**Example:**

```bash
node helpers/createStats.js scripted-speech stats-folder
```

**What it does:**

- Reads individual locale statistics from a folder
- Normalizes age and gender splits by number of clips
- Aggregates data across all locales
- Outputs complete statistics with totals

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
- Error messages will indicate whether a dataset type is invalid or not yet ready
- Each command displays usage information when run
