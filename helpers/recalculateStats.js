const fs = require("fs");
const args = process.argv.slice(2);

const main = (filePath) => {
  const stats = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const data = stats.locales;
  const calc = {
    totalDuration: 0,
    totalValidDurationSecs: 0,
    totalHrs: 0,
    totalValidHrs: 0

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

main(args[0]);
