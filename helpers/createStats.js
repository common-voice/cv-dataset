const fs = require("fs/promises");
const path = require("path");
const process = require("node:process");

const getLocaleFromFilename = (filename) =>
  filename.split(".json")[0].split("_")[1];

const main = async () => {
  const args = process.argv;
  const statsFolder = args[2];
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

main();
