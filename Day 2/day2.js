const fs = require("fs");

function partTwo (file) {
    const lines = fs.readFileSync(file, "utf-8").trim().split(/\r?\n/);
    // console.log(lines);
    //    Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    
    
    return lines.map((line) =>{
        const maxCount = {
            red: 0,
            green: 0, 
            blue: 0,
        };
        line
       .split(": ")[1]
       .split("; ")
       .forEach((set) => {
        const pulls = set.split(", ");
        return pulls.forEach((pull) => {
            const [count, color] = pull.split(' ');
            if(maxCount[color] < Number(count)) {
                maxCount[color] = Number(count)
            }
        });
    });
    return maxCount.red * maxCount.green * maxCount.blue;
}).reduce((s, v) => s + v );
}


console.log(partTwo("./input.txt"));
