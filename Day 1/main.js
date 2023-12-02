const fs = require("fs");
const { isNumber } = require("util");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  }

  const array = data.toString().split("\n");

  let firstValue = 0;
  let lastValue = 0;
  let compined = 0;
  let result = 0;
  let line = "";
  for (i = 0; i < array.length; i++) {
    line = array[i];
    // line = line.replaceAll("");
    line = line.replaceAll("one", "o1e");
    line = line.replaceAll("two", "t2o");
    line = line.replaceAll("three", "t3e");
    line = line.replaceAll("four", "f4r");
    line = line.replaceAll("five", "f5e");
    line = line.replaceAll("six", "s6x");
    line = line.replaceAll("seven", "s7n");
    line = line.replaceAll("eight", "e8t");
    line = line.replaceAll("nine", "n9e");
    // console.log(line);

    for (let start = 0; start < line.length; start++) {
      if (!isNaN(line.charAt(start))) {
        firstValue = line.charAt(start);
        // console.log(line + " First value: " + firstValue);
        break;
      }
    }

    for (let end = line.length - 1; 0 <= end; end--) {
      if (!isNaN(line.charAt(end))) {
        lastValue = line.charAt(end);
        // console.log(line + " Last value: " + lastValue);
        break;
      }
    }
    compined = firstValue + lastValue;
    result += parseInt(compined);
    console.log(
      i +
        " " +
        compined +
        " result = " +
        result +
        " " +
        line +
        " orginal: " +
        array[i]
    );
  }

  console.log(result);
});
