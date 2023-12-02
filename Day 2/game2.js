const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  }

  const gamePerLine = data.toString().split("\n");

  let result = 0;
  let total = 0;
  for (i = 0; i < gamePerLine.length; i++) {
    result = gameCalc(gamePerLine[i]);

    if (!isNaN(result)) {
      total += parseInt(result);
    }
  }
  console.log(total);
});

//checks if the thresholds have been exceeded.
gameCalc = function (gameLine) {
  // console.log(gameLine);
  let gameIdIndex = gameLine.indexOf(":");
  if (gameIdIndex === -1) {
    return null;
  }
  let gameId = gameLine.slice(gameIdIndex - 1, gameIdIndex);

  let counts = {
    blue: 0,
    green: 0,
    red: 0,
  };

  let thresholds = {
    blue: 14,
    red: 12,
    green: 13,
  };

  let rounds = gameLine.split(";");

  rounds.forEach((round) => {
    let colorCounts = round.match(/(\d+)\s*([a-zA-Z]+)/g);

    if (colorCounts) {
      colorCounts.forEach((pair) => {
        let [count, color] = pair.split(/\s+/);

        count = parseInt(count);
        counts[color] += count;
      });
    }
  });

  function check(counts, thresholds) {
    let exceedsThreshold = Object.keys(counts).some(
      (color) => counts[color] > thresholds[color]
    );
    return exceedsThreshold;
  }

  let testThreshold = check(counts, thresholds);

  if (!testThreshold) {
    return gameId;
  }
};
