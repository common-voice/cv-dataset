const fs = require("fs/promises");
const path = require("path");
const process = require("node:process");
const {
  DATASET_TYPES,
  buildFolderPath,
  getLocaleFromFilename,
  validateDatasetType,
} = require("./common");

const showUsage = () => {
  console.log(
    "\nUsage: node helpers/createStats.js <dataset-type> <stats-folder>",
  );
  console.log("\nExample:");
  console.log("  node helpers/createStats.js scripted-speech stats-folder");
  console.log("\nDataset Types: " + DATASET_TYPES.join(", "));
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
      localeSplits.age[key] = Number((value / numOfClips).toFixed(4));
    }

    for (const [key, value] of Object.entries(localeSplits.gender)) {
      localeSplits.gender[key] = Number((value / numOfClips).toFixed(4));
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

const spontaneousSpeech = async (statsFolder) => {
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

    for (const [key, value] of Object.entries(l.demographics.age)) {
      l.demographics.age[key] = Number((value / numOfClips).toFixed(4));
    }

    for (const [key, value] of Object.entries(l.demographics.gender)) {
      l.demographics.gender[key] = Number((value / numOfClips).toFixed(4));
    }

    completeStats["locales"][locale] = l;
  }

  let totalDurationMs = 0;
  let totalValidDurationMs = 0;
  let totalHrs = 0;
  let totalValidHrs = 0;

  Object.keys(completeStats.locales).forEach((locale) => {
    totalDurationMs += completeStats.locales[locale].duration.total_ms;
    totalValidDurationMs += completeStats.locales[locale].duration.validated_ms;
    totalHrs += completeStats.locales[locale].duration.total_hrs;
    totalValidHrs += completeStats.locales[locale].duration.validated_hrs;
  });

  const result = {
    ...completeStats,
    totalDurationMs: Math.round(totalDurationMs),
    totalValidDurationMs: Math.round(totalValidDurationMs),
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

  validateDatasetType(datasetType);

  const folderPath = buildFolderPath(datasetType, statsFolder);

  switch (datasetType) {
    case "scripted-speech":
      await scriptedSpeech(folderPath);
      break;
    case "spontaneous-speech":
      await spontaneousSpeech(folderPath);
      break;
    default:
      throw new Error(`No handler for dataset type "${datasetType}"`);
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
