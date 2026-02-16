const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);

const DATASET_TYPES = [
  "scripted-speech",
  "spontaneous-speech",
  "code-switching",
];
const READY_TYPES = ["scripted-speech"];

const getDiffs = (a, b) => {
  const obj = {};
  const diff = a - b;

  obj["delta"] = diff;
  obj["percentage"] = +((diff / b) * 100).toFixed(0);
  return obj;
};

const buildPath = (datasetType, datasetName) => {
  const filename = datasetName.endsWith(".json")
    ? datasetName
    : `${datasetName}.json`;
  return path.join(__dirname, "..", "datasets", datasetType, filename);
};

const showUsage = () => {
  console.log(
    "\nUsage: node helpers/compareReleases.js <dataset-type> <dataset-1> <dataset-2> [output-file]",
  );
  console.log("\nExample:");
  console.log(
    "  node helpers/compareReleases.js scripted-speech cv-corpus-24.0-2025-12-05 cv-corpus-23.0-2025-09-05",
  );
  console.log("\nDataset Types:");
  console.log("  Ready: " + READY_TYPES.join(", "));
  console.log(
    "  Upcoming: " +
      DATASET_TYPES.filter((t) => !READY_TYPES.includes(t)).join(", "),
  );
  console.log();
};

const scriptedSpeech = (aPath, bPath, reportPath) => {
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

    if (!aStats) {
      removedLanguages.push(locale);
      continue;
    }

    diffStats[locale] = Object.keys(aStats).reduce((stats, key) => {
      const a = aStats[key];
      const b = bStats[key];

      if (typeof a !== "number" || typeof b !== "number") return stats;

      if (!totalStats[key]) {
        totalStats[key] = {};
        totalStats[key]["new"] = 0;
        totalStats[key]["old"] = 0;
      }

      totalStats[key]["new"] += +a;
      totalStats[key]["old"] += +b;
      totalStats[key]["diffs"] = getDiffs(
        totalStats[key]["new"],
        totalStats[key]["old"],
      );
      stats[key] = getDiffs(a, b);
      return stats;
    }, {});
  }

  console.log(totalStats);
  console.log("New Languages: ", newLanguages);
  console.log("Removed Languages: ", removedLanguages);

  if (reportPath) {
    fs.writeFileSync(reportPath, JSON.stringify(totalStats));
    fs.writeFileSync(
      reportPath.split(".")[0] + "-total.json",
      JSON.stringify(diffStats),
    );
  } else {
    process.stdout.write(JSON.stringify(diffStats));
  }
};

const main = (datasetType, dataset1, dataset2, outputFile) => {
  showUsage();

  if (!DATASET_TYPES.includes(datasetType)) {
    throw new Error(`"${datasetType}" is not a valid dataset type`);
  }

  if (!READY_TYPES.includes(datasetType)) {
    throw new Error(`Dataset type "${datasetType}" is not ready yet`);
  }

  const aPath = buildPath(datasetType, dataset1);
  const bPath = buildPath(datasetType, dataset2);
  const reportPath = outputFile
    ? buildPath(datasetType, outputFile)
    : undefined;

  switch (datasetType) {
    case "scripted-speech":
      scriptedSpeech(aPath, bPath, reportPath);
      break;
    default:
      throw new Error(`Dataset type "${datasetType}" is not ready yet`);
  }
};

try {
  if (args.length < 3) {
    showUsage();
    throw new Error("Must provide dataset type and at least two datasets");
  }
  main(...args);
} catch (error) {
  console.error(error);
  process.exit(1);
}
