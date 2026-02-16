const fs = require("fs/promises");
const path = require("path");
const process = require("node:process");

const DATASET_TYPES = [
  "scripted-speech",
  "spontaneous-speech",
  "code-switching",
];
const READY_TYPES = ["scripted-speech"];

const getLocaleFromFilename = (filename) =>
  filename.split(".json")[0].split("_")[1];

const buildPath = (datasetType, folderName) => {
  return path.join(__dirname, "..", "datasets", datasetType, folderName);
};

const showUsage = () => {
  console.log(
    "\nUsage: node helpers/createStats.js <dataset-type> <stats-folder>",
  );
  console.log("\nExample:");
  console.log("  node helpers/createStats.js scripted-speech stats-folder");
  console.log("\nDataset Types:");
  console.log("  Ready: " + READY_TYPES.join(", "));
  console.log(
    "  Upcoming: " +
      DATASET_TYPES.filter((t) => !READY_TYPES.includes(t)).join(", "),
  );
  console.log();
};

const scriptedSpeech = async (statsFolder) => {
  const stats = await fs.readdir(statsFolder);

  const completeStats = { locales: {} };

  for (const file of stats) {
    const locale = getLocaleFromFilename(file);

    const content = await fs.readFile(path.join(statsFolder, file), {
      encoding: "utf-8",
    });

    const json = JSON.parse(content);
    const l = json.locales[locale];
    const numOfClips = l.clips;
    const localeSplits = l.splits;

    for (const [key, value] of Object.entries(localeSplits.age)) {
      localeSplits.age[key] = Number((value / numOfClips).toFixed(2));
    }

    for (const [key, value] of Object.entries(localeSplits.gender)) {
      localeSplits.gender[key] = Number((value / numOfClips).toFixed(2));
    }

    completeStats["locales"][locale] = l;
  }

  let totalDuration = 0;
  let totalValidDurationSecs = 0;
  let totalHrs = 0;
  let totalValidHrs = 0;

  Object.keys(completeStats.locales).forEach((locale) => {
    totalDuration += completeStats.locales[locale].duration;
    totalValidDurationSecs += completeStats.locales[locale].validDurationSecs;
    totalHrs += completeStats.locales[locale].totalHrs;
    totalValidHrs += completeStats.locales[locale].validHrs;
  });

  const result = {
    ...completeStats,
    totalDuration: Math.round(totalDuration),
    totalValidDurationSecs: Math.round(totalValidDurationSecs),
    totalHrs: Math.round(totalHrs),
    totalValidHrs: Math.round(totalValidHrs),
  };

  console.log(JSON.stringify(result));
};

const main = async () => {
  const args = process.argv;
  const datasetType = args[2];
  const statsFolder = args[3];

  showUsage();

  if (!datasetType || !statsFolder) {
    throw new Error("Must provide dataset type and stats folder");
  }

  if (!DATASET_TYPES.includes(datasetType)) {
    throw new Error(`"${datasetType}" is not a valid dataset type`);
  }

  if (!READY_TYPES.includes(datasetType)) {
    throw new Error(`Dataset type "${datasetType}" is not ready yet`);
  }

  const folderPath = buildPath(datasetType, statsFolder);

  switch (datasetType) {
    case "scripted-speech":
      await scriptedSpeech(folderPath);
      break;
    default:
      throw new Error(`Dataset type "${datasetType}" is not ready yet`);
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
