import nodefs from "fs";
import yaml from "js-yaml";
import fs from "./lib/fs";

const name = process.argv.slice(2)[0];
const srcdir = `config/languages/${name}/`;
const outdir = "src/js/languages/";

nodefs.readdir(srcdir, (err, filenames) => {
    filenames.forEach((filename) => {
        if (filename.indexOf(".yml") === -1) {
            return;
        }
        nodefs.readFile(srcdir + filename, "utf-8", (err, content) => {
            let result = "module.exports = " + JSON.stringify(yaml.safeLoad(content)) + ";";
            fs.writeFile(outdir + filename.replace(".yml", ".json"), result)
        });
    });
});
