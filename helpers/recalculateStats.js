const fs = require("fs");
const args = process.argv.slice(2);

const main = (filePath) => {
  const stats = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const data = stats.locales;

  let avg = 0;
  Object.keys(data).map((s) => {
    avg += +data[s].validDurationSecs;
  });
  console.log(avg);
};

main(args[0]);
