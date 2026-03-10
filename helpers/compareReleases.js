const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);
const { DATASET_TYPES, buildFilePath, validateDatasetType } = require("./common");

const getDiffs = (a, b) => {
  const obj = {};
  const diff = a - b;

  obj["delta"] = diff;
  obj["percentage"] = b === 0 ? (diff === 0 ? 0 : null) : +((diff / b) * 100).toFixed(0);
  return obj;
};

const USAGE = "Usage: node helpers/compareReleases.js <dataset-type> <dataset-1> <dataset-2> [output-file]";

const showUsage = () => {
  console.error("\n" + USAGE);
  console.error("\nExample:");
  console.error(
    "  node helpers/compareReleases.js scripted-speech cv-corpus-24.0-2025-12-05 cv-corpus-23.0-2025-09-05",
  );
  console.error("\nDataset Types: " + DATASET_TYPES.join(", "));
  console.error();
};

const diffValues = (a, b) => {
  if (typeof a === "number" && typeof b === "number") {
    return getDiffs(a, b);
  }
  if (a && b && typeof a === "object" && typeof b === "object" && !Array.isArray(a)) {
    const result = {};
    for (const key of Object.keys(a)) {
      if (!(key in b)) continue;
      const d = diffValues(a[key], b[key]);
      if (d !== undefined) result[key] = d;
    }
    return Object.keys(result).length > 0 ? result : undefined;
  }
  return undefined;
};

const NON_ADDITIVE_KEYS = new Set([
  "splits", "demographics", "avgDurationSecs",
  "avg_ms", "min_ms", "max_ms", "avg_chars_per_sec",
  "avg_recordings_per_question", "edited_pct",
]);

const accumulateTotal = (totals, key, a, b) => {
  if (NON_ADDITIVE_KEYS.has(key)) return;
  if (typeof a === "number" && typeof b === "number") {
    if (!totals[key]) totals[key] = { new: 0, old: 0 };
    totals[key]["new"] += a;
    totals[key]["old"] += b;
    totals[key]["diffs"] = getDiffs(totals[key]["new"], totals[key]["old"]);
    return;
  }
  if (a && b && typeof a === "object" && typeof b === "object" && !Array.isArray(a)) {
    if (!totals[key]) totals[key] = {};
    for (const subKey of Object.keys(a)) {
      if (!(subKey in b)) continue;
      accumulateTotal(totals[key], subKey, a[subKey], b[subKey]);
    }
  }
};

const compareLocales = (aPath, bPath, reportPath) => {
  const newLanguages = [];
  const removedLanguages = [];
  const aFile = JSON.parse(fs.readFileSync(aPath, "utf-8"));
  const bFile = JSON.parse(fs.readFileSync(bPath, "utf-8"));
  const diffStats = {};
  const aLocales = aFile.locales;
  const bLocales = bFile.locales;
  const totalStats = {};

  for (const locale of Object.keys(aLocales)) {
    const aStats = aLocales[locale];
    const bStats = bLocales[locale];
    if (!bStats) {
      newLanguages.push(locale);
      continue;
    }

    diffStats[locale] = {};
    for (const key of Object.keys(aStats)) {
      const a = aStats[key];
      const b = bStats[key];

      const d = diffValues(a, b);
      if (d !== undefined) diffStats[locale][key] = d;

      accumulateTotal(totalStats, key, a, b);
    }
  }

  for (const locale of Object.keys(bLocales)) {
    if (!aLocales[locale]) {
      removedLanguages.push(locale);
    }
  }

  console.error(totalStats);
  console.error("New Languages: ", newLanguages);
  console.error("Removed Languages: ", removedLanguages);

  if (reportPath) {
    fs.writeFileSync(reportPath, JSON.stringify(totalStats));
    const parsed = path.parse(reportPath);
    fs.writeFileSync(
      path.join(parsed.dir, parsed.name + "-total.json"),
      JSON.stringify(diffStats),
    );
  } else {
    process.stdout.write(JSON.stringify(diffStats));
  }
};

const main = (datasetType, dataset1, dataset2, outputFile) => {
  validateDatasetType(datasetType);

  const aPath = buildFilePath(datasetType, dataset1);
  const bPath = buildFilePath(datasetType, dataset2);
  const reportPath = outputFile
    ? buildFilePath(datasetType, outputFile)
    : undefined;

  switch (datasetType) {
    case "scripted-speech":
    case "spontaneous-speech":
      compareLocales(aPath, bPath, reportPath);
      break;
    default:
      throw new Error(`No handler for dataset type "${datasetType}"`);
  }
};

console.error(USAGE);
try {
  if (args.length < 3) {
    showUsage();
    throw new Error("Must provide dataset type and at least two datasets");
  }
  main(...args);
} catch (error) {
  if (error.message.includes("not a valid dataset type")) showUsage();
  console.error(error);
  process.exit(1);
}
