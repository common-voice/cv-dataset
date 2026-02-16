const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);

const DATASET_TYPES = [
  "scripted-speech",
  "spontaneous-speech",
  "code-switching",
];
const READY_TYPES = ["scripted-speech"];

const buildPath = (datasetType, datasetName) => {
  const filename = datasetName.endsWith(".json")
    ? datasetName
    : `${datasetName}.json`;
  return path.join(__dirname, "..", "datasets", datasetType, filename);
};

const showUsage = () => {
  console.log(
    "\nUsage: node helpers/recalculateStats.js <dataset-type> <dataset>",
  );
  console.log("\nExample:");
  console.log(
    "  node helpers/recalculateStats.js scripted-speech cv-corpus-24.0-2025-12-05",
  );
  console.log("\nDataset Types:");
  console.log("  Ready: " + READY_TYPES.join(", "));
  console.log(
    "  Upcoming: " +
      DATASET_TYPES.filter((t) => !READY_TYPES.includes(t)).join(", "),
  );
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
  let avg = 0;
  Object.keys(data).map((s) => {
    calc.totalValidDurationSecs += +data[s].validDurationSecs;
    calc.totalDuration += +data[s].duration;
    calc.totalHrs += +data[s].totalHrs;
    calc.totalValidHrs += +data[s].validHrs;
  });

  let a = Object.keys(data).map((s, d) => {
    return +data[s].validDurationSecs;
  });
  console.log(a.sort((a, b) => a - b));
  console.log(JSON.stringify(calc));
};

const main = (datasetType, dataset) => {
  showUsage();

  if (!DATASET_TYPES.includes(datasetType)) {
    throw new Error(`"${datasetType}" is not a valid dataset type`);
  }

  if (!READY_TYPES.includes(datasetType)) {
    throw new Error(`Dataset type "${datasetType}" is not ready yet`);
  }

  const filePath = buildPath(datasetType, dataset);

  switch (datasetType) {
    case "scripted-speech":
      scriptedSpeech(filePath);
      break;
    default:
      throw new Error(`Dataset type "${datasetType}" is not ready yet`);
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
