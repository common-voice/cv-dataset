const fs = require("fs");
const args = process.argv.slice(2);
const { DATASET_TYPES, buildFilePath, validateDatasetType } = require("./common");

const USAGE = "Usage: node helpers/recalculateStats.js <dataset-type> <dataset>";

const showUsage = () => {
  console.error("\n" + USAGE);
  console.error("\nExample:");
  console.error(
    "  node helpers/recalculateStats.js scripted-speech cv-corpus-24.0-2025-12-05",
  );
  console.error("\nDataset Types: " + DATASET_TYPES.join(", "));
  console.error();
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
  Object.keys(data).forEach((s) => {
    calc.totalValidDurationSecs += +data[s].validDurationSecs;
    calc.totalDuration += +data[s].duration;
    calc.totalHrs += +data[s].totalHrs;
    calc.totalValidHrs += +data[s].validHrs;
  });

  const a = Object.keys(data).map((s) => {
    return +data[s].validDurationSecs;
  });
  console.error(a.sort((a, b) => a - b));
  process.stdout.write(JSON.stringify(calc));
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
  Object.keys(data).forEach((s) => {
    calc.totalValidDurationMs += +data[s].duration.validated_ms;
    calc.totalDurationMs += +data[s].duration.total_ms;
    calc.totalHrs += +data[s].duration.total_hrs;
    calc.totalValidHrs += +data[s].duration.validated_hrs;
  });

  const a = Object.keys(data).map((s) => {
    return +data[s].duration.validated_ms;
  });
  console.error(a.sort((a, b) => a - b));
  process.stdout.write(JSON.stringify(calc));
};

const main = (datasetType, dataset) => {
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

console.error(USAGE);
try {
  if (args.length < 2) {
    showUsage();
    throw new Error("Must provide dataset type and dataset");
  }
  main(...args);
} catch (error) {
  if (error.message.includes("not a valid dataset type")) showUsage();
  console.error(error);
  process.exit(1);
}
