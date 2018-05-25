import fs from "fs";

const writeFile = (file, contents) => new Promise((l, r) => {
    fs.writeFile(file, contents, "utf8", err => err ? r(err) : l());
});

const makeDir = (name) => new Promise((l, r) => {
    mkdirp(name, err => err ? r(err) : l());
});

export default { writeFile, makeDir };
