const fs = require("fs");

function partOne (file) {
    const lines = fs.readFileSync(file, "utf-8").trim().split("\n");
    console.log(lines);
}
console.log(partOne("./input.txt"));
