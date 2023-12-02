const fs = require("fs");

// Function to check if thresholds are exceeded for a single round
const checkThresholds = function (counts, thresholds) {
  return Object.keys(counts).every(
    (color) => counts[color] <= thresholds[color]
  );
};

// Function to process a single game line
const gameCalc = function (gameLine) {
  let gameIdMatch = gameLine.match(/Game (\d+):/);
  if (!gameIdMatch) {
    return null;
  }
  let gameId = parseInt(gameIdMatch[1]);

  let thresholds = {
    blue: 14,
    red: 12,
    green: 13,
  };

  let rounds = gameLine.split(";");
  let validGame = true;

  for (let i = 0; i < rounds.length; i++) {
    let round = rounds[i];
    let counts = {
      blue: 0,
      green: 0,
      red: 0,
    };

    let colorCounts = round.match(/(\d+)\s*([a-zA-Z]+)/g);

    if (colorCounts) {
      colorCounts.forEach((pair) => {
        let [count, color] = pair.split(/\s+/);

        count = parseInt(count);
        counts[color] += count;
      });
    }

    // Check thresholds for the current round
    if (!checkThresholds(counts, thresholds)) {
      validGame = false;
      break; // No need to check further rounds in this game
    }
  }

  return validGame ? gameId : null;
};

// Read the file and process each game line
fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const gamePerLine = data.toString().split("\n");

  let total = 0;
  for (let i = 0; i < gamePerLine.length; i++) {
    let result = gameCalc(gamePerLine[i]);

    if (result !== null && !Number.isNaN(result)) {
      total += result;
    }
  }
  console.log(total);
  console.log(total);
});
