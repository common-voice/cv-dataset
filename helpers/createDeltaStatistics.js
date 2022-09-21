const fs = require("fs");
const args = process.argv.slice(2);

const getDiffs = (a, b) => +(a - b).toFixed(2);

const main = (aPath, bPath, reportPath) => {
  const newLanguages = [];
  const removedLanguages = [];
  const newerReleaseData = JSON.parse(fs.readFileSync(aPath, "utf-8"));
  const olderReleaseData = JSON.parse(fs.readFileSync(bPath, "utf-8"));
  const diffStats = {};
  const newerStatsFile = newerReleaseData.locales;
  const olderStatsFile = olderReleaseData.locales;

  for (const locale of Object.keys(newerStatsFile)) {
    const aStats = newerStatsFile[locale]; // points to "en" -> {"users","totalHrs", etc}
    const bStats = olderStatsFile[locale];

    if (!bStats) {
      //language was added in newest release
      newLanguages.push(locale);
      continue;
    }

    if (!aStats) {
      // language no longer exists in newest release
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
  console.log(totalStats);
  console.log("New Languages: ", newLanguages);
  console.log("Removed Languages: ", removedLanguages);

  if (reportPath) {
    fs.writeFileSync(
      reportPath.split(".")[0] + "-total.json",
      JSON.stringify({ locales: { ...diffStats }, ...totalStats })
    );
  } else {
    process.stdout.write(JSON.stringify({ ...diffStats, ...totalStats }));
  }
};

try {
  if (args.length < 2) {
    throw new Error("Must provide two file paths");
  }
  main(...args);
} catch (error) {
  console.error(error);
}
