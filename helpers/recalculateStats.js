const fs = require("fs");
const args = process.argv.slice(2);

const main = (filePath) => {
  const stats = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const data = stats.locales;
  const calc = {
    validDurationSecs: 0,
    totalHrs: 0,
  };
  let avg = 0;
  Object.keys(data).map((s) => {
    calc.validDurationSecs += +data[s].validDurationSecs;
    calc.totalHrs += +data[s].totalHrs;
  });

  let a = Object.keys(data).map((s, d) => {
    return +data[s].validDurationSecs;
  });
  console.log(a.sort((a, b) => a - b));
  console.log("Total validDurationSecs: ", calc.validDurationSecs);
  console.log("Total validDurationSecs: ", calc.validDurationSecs);
  console.log("Total Hours: ", calc.totalHrs);
};

main(args[0]);
