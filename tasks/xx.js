import nodefs from "fs";
import readline from "readline";

import fs from "./lib/fs";

const name = process.argv.slice(2)[0];
const srcdir = `config/languages/${name}/`;

const convertToXX = (line) => {
    let key = line.substring(0, line.indexOf(":"));
    let val = line.substring(line.indexOf(":"));

    if (!key) {
        key = line.match(/^\s*/)[0].replace(" ", "");
    }

    let wordsXX = val.split(/\s+/).map((word) => {
        if (word.indexOf("%(") > -1 && word.indexOf(")s") === word.length - 2) {
            return word;
        }
        return word.replace(/[^\.,-\/#!$%\^&\*;:{}=\-_`~()\"\"|]/g, "X");
    });
    return key + wordsXX.join(" ") + "\n";
};

let result = "";

let lineReader = readline.createInterface({
    input: nodefs.createReadStream(`${srcdir}en.yml`)
});

lineReader.on("line", (line) => {
    result += convertToXX(line);
});

lineReader.on("close", () => {
    fs.writeFile(`${srcdir}xx.yml`, result)
        .then(() => process.exit())
        .catch(() => process.exit(1));
});
