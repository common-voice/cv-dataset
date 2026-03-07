const fs = require("fs");
const args = process.argv.slice(2);
const { DATASET_TYPES, buildFilePath, validateDatasetType } = require("./common");

const getDiffs = (a, b) => +(a - b).toFixed(2);

const showUsage = () => {
  console.log(
    "\nUsage: node helpers/createDeltaStatistics.js <dataset-type> <dataset-1> <dataset-2> [output-file]",
  );
  console.log("\nExample:");
  console.log(
    "  node helpers/createDeltaStatistics.js scripted-speech cv-corpus-24.0-2025-12-05 cv-corpus-23.0-2025-09-05",
  );
  console.log("\nDataset Types: " + DATASET_TYPES.join(", "));
  console.log();
};

const computeLocaleDiffs = (newerStatsFile, olderStatsFile) => {
  const newLanguages = [];
  const removedLanguages = [];
  const diffStats = {};

  for (const locale of Object.keys(newerStatsFile)) {
    const aStats = newerStatsFile[locale];
    const bStats = olderStatsFile[locale];

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

      if (typeof a === "string") {
        stats[key] = a;
        return stats;
      }

      if (typeof a !== "number" || typeof b !== "number") return stats;
      if (a && !b) {
        stats[key] = a;
        return stats;
      }

      if (b && !a) {
        stats[key] = -b;
      }

      stats[key] = getDiffs(a, b);
      if (key === "avgDurationSecs") stats[key] = a;

      return stats;
    }, {});
  }

  return { diffStats, newLanguages, removedLanguages };
};

const writeOrPrint = (reportPath, diffStats, totalStats, newLanguages, removedLanguages) => {
  console.log(totalStats);
  console.log("New Languages: ", newLanguages);
  console.log("Removed Languages: ", removedLanguages);

  if (reportPath) {
    fs.writeFileSync(
      reportPath.split(".")[0] + "-total.json",
      JSON.stringify({ locales: { ...diffStats }, ...totalStats }),
    );
  } else {
    process.stdout.write(JSON.stringify({ ...diffStats, ...totalStats }));
  }
};

const scriptedSpeech = (aPath, bPath, reportPath) => {
  const newerReleaseData = JSON.parse(fs.readFileSync(aPath, "utf-8"));
  const olderReleaseData = JSON.parse(fs.readFileSync(bPath, "utf-8"));
  const { diffStats, newLanguages, removedLanguages } = computeLocaleDiffs(
    newerReleaseData.locales, olderReleaseData.locales,
  );
  const totalStats = {
    totalDuration:
      newerReleaseData.totalDuration - olderReleaseData.totalDuration,
    totalValidDurationSecs:
      newerReleaseData.totalValidDurationSecs -
      olderReleaseData.totalValidDurationSecs,
    totalHrs: newerReleaseData.totalHrs - olderReleaseData.totalHrs,
    totalValidHrs:
      newerReleaseData.totalValidHrs - olderReleaseData.totalValidHrs,
  };
  writeOrPrint(reportPath, diffStats, totalStats, newLanguages, removedLanguages);
};

const spontaneousSpeech = (aPath, bPath, reportPath) => {
  const newerReleaseData = JSON.parse(fs.readFileSync(aPath, "utf-8"));
  const olderReleaseData = JSON.parse(fs.readFileSync(bPath, "utf-8"));
  const { diffStats, newLanguages, removedLanguages } = computeLocaleDiffs(
    newerReleaseData.locales, olderReleaseData.locales,
  );
  const totalStats = {
    totalDurationMs:
      newerReleaseData.totalDurationMs - olderReleaseData.totalDurationMs,
    totalValidDurationMs:
      newerReleaseData.totalValidDurationMs -
      olderReleaseData.totalValidDurationMs,
    totalHrs: newerReleaseData.totalHrs - olderReleaseData.totalHrs,
    totalValidHrs:
      newerReleaseData.totalValidHrs - olderReleaseData.totalValidHrs,
  };
  writeOrPrint(reportPath, diffStats, totalStats, newLanguages, removedLanguages);
};

const main = (datasetType, dataset1, dataset2, outputFile) => {
  showUsage();
  validateDatasetType(datasetType);

  const aPath = buildFilePath(datasetType, dataset1);
  const bPath = buildFilePath(datasetType, dataset2);
  const reportPath = outputFile
    ? buildFilePath(datasetType, outputFile)
    : undefined;

  switch (datasetType) {
    case "scripted-speech":
      scriptedSpeech(aPath, bPath, reportPath);
      break;
    case "spontaneous-speech":
      spontaneousSpeech(aPath, bPath, reportPath);
      break;
    default:
      throw new Error(`No handler for dataset type "${datasetType}"`);
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
