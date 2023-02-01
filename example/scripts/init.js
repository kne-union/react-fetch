const fs = require("fs-extra");
const spawn = require("cross-spawn-promise");
const path = require("path");

(async () => {
    const parentPackageJson = await fs.readJson(path.resolve(__dirname, "../../package.json"));
    const packageJson = await fs.readJson(path.resolve(__dirname, "../package.json"));
    packageJson.dependencies = Object.assign({}, packageJson.dependencies, {
        [parentPackageJson.name]: "file:..",
        "react": "file:../node_modules/react",
        "react-dom": "file:../node_modules/react-dom"
    });
    await fs.writeJson(path.resolve(__dirname, "../package.json"), packageJson);
    await spawn("npm", ["i"], {stdio: 'inherit'});
    await spawn("npm", ["i", "node-sass", "--save-dev"], {stdio: 'inherit'});
})().catch((e) => {
    console.error(e);
});
