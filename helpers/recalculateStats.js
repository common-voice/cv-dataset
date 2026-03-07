const fs = require("fs");
const args = process.argv.slice(2);
const { DATASET_TYPES, buildFilePath, validateDatasetType } = require("./common");

const showUsage = () => {
  console.log(
    "\nUsage: node helpers/recalculateStats.js <dataset-type> <dataset>",
  );
  console.log("\nExample:");
  console.log(
    "  node helpers/recalculateStats.js scripted-speech cv-corpus-24.0-2025-12-05",
  );
  console.log("\nDataset Types: " + DATASET_TYPES.join(", "));
  console.log();
};

const scriptedSpeech = (filePath) => {
  const stats = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const data = stats.locales;
  const calc = {
    totalDuration: 0,
    totalValidDurationSecs: 0,
    totalHrs: 0,
    totalValidHrs: 0,
  };
  Object.keys(data).map((s) => {
    calc.totalValidDurationSecs += +data[s].validDurationSecs;
    calc.totalDuration += +data[s].duration;
    calc.totalHrs += +data[s].totalHrs;
    calc.totalValidHrs += +data[s].validHrs;
  });

  let a = Object.keys(data).map((s) => {
    return +data[s].validDurationSecs;
  });
  console.log(a.sort((a, b) => a - b));
  console.log(JSON.stringify(calc));
};

const spontaneousSpeech = (filePath) => {
  const stats = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const data = stats.locales;
  const calc = {
    totalDurationMs: 0,
    totalValidDurationMs: 0,
    totalHrs: 0,
    totalValidHrs: 0,
  };
  Object.keys(data).map((s) => {
    calc.totalValidDurationMs += +data[s].duration.validated_ms;
    calc.totalDurationMs += +data[s].duration.total_ms;
    calc.totalHrs += +data[s].duration.total_hrs;
    calc.totalValidHrs += +data[s].duration.validated_hrs;
  });

  let a = Object.keys(data).map((s) => {
    return +data[s].duration.validated_ms;
  });
  console.log(a.sort((a, b) => a - b));
  console.log(JSON.stringify(calc));
};

const main = (datasetType, dataset) => {
  showUsage();
  validateDatasetType(datasetType);

  const filePath = buildFilePath(datasetType, dataset);

  switch (datasetType) {
    case "scripted-speech":
      scriptedSpeech(filePath);
      break;
    case "spontaneous-speech":
      spontaneousSpeech(filePath);
      break;
    default:
      throw new Error(`No handler for dataset type "${datasetType}"`);
  }
};

try {
  if (args.length < 2) {
    showUsage();
    throw new Error("Must provide dataset type and dataset");
  }
  main(...args);
} catch (error) {
  console.error(error);
  process.exit(1);
}
