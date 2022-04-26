const fs = require("fs");
const args = process.argv.slice(2);

const getDiffs = (a, b) => {
  const obj = {};
  const diff = a - b;

  obj["delta"] = diff;
  obj["percentage"] = +((diff / b) * 100).toFixed(0);
  return obj;
};

const main = (aPath, bPath, reportPath) => {
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
        totalStats[key]["old"]
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
      JSON.stringify(diffStats)
    );
  } else {
    process.stdout.write(JSON.stringify(diffStats));
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
