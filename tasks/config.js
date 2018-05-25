import nodefs from "fs";
import fs from "./lib/fs";
import fjs from "functional.js";
import config from "cordova-config";

const name = process.argv.slice(2)[0];
const id = `com.presciense.${name.toLowerCase()}`;

let xml = new config("./config.xml");
xml.setName(name);
xml.setID(id);
xml.setDescription(`${name} App`);

xml.writeSync();

const key = "app_identifier";
let matchfile = nodefs.readFileSync("./Matchfile").toString().split("\n");

fjs.each((line, i) => {
    if (line.indexOf(key) === 0) {
        matchfile[i] = `${key} "${id}"`;
        return true;
    }
}, matchfile);

fs.writeFile("./Matchfile", matchfile.join("\n"))
    .then(() => process.exit())
    .catch(() => process.exit(1));
