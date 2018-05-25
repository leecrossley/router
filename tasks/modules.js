import nodefs from "fs";
import fjs from "functional.js";

import fs from "./lib/fs";

const modulepack = process.argv.slice(2)[0];
const config = JSON.parse(nodefs.readFileSync(`./config/${modulepack}.json`).toString());
const layout = config.layout;
const routesTemplate = nodefs.readFileSync("./src/js/routes.tmpl").toString();

let imports = `import ${layout} from "./layouts/${layout}";\n`

let modules = fjs.select((m) => m.path, config.modules);

imports += fjs.map((m) => {
    return `import ${m.name} from "./modules/${m.name}";`;
}, modules).join("\n");

let attributeProps = fjs.map((p) => {
    return `${p[0]}="${p[1]}"`;
});

let routes = fjs.map((m) => {
    let props = m.props ? attributeProps(fjs.toArray(m.props)) : "";
    return `<Route path="${m.path}" component={${m.name}} ${props} />`;
}, modules).join("\n            ");

const output = routesTemplate
    .replace("@imports", imports)
    .replace("@layout", layout)
    .replace("@routes", routes)

fs.writeFile("./src/js/routes.js", output)
    .then(() => process.exit())
    .catch(() => process.exit(1));
