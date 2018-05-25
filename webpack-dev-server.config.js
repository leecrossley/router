const webpack = require("webpack");
const happyPack = require("happypack");
const path = require("path");
const nodeModulesPath = path.resolve(__dirname, "node_modules");

const config = {
    entry: [
        "babel-polyfill",
        "webpack-hot-middleware/client",
        path.join(__dirname, "src/js/app.js")
    ],
    devServer: {
        contentBase: path.join(__dirname, "src"),
        devtool: "eval",
        hot: true,
        inline: true,
        port: 9006,
        host: "localhost"
    },
    output: {
        filename: "app.js",
    },
    devtool: "eval",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new happyPack({
            loaders: ["babel"],
            threads: 4
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            noParse: [
                /aws\-sdk/
            ],
            loaders: [
                "happypack/loader"
            ],
            exclude: [nodeModulesPath]
        }, {
            test: /\.scss$/,
            loaders: [
                "style",
                "css",
                "sass"
            ]
        },
        {
            test: /\.(png|jpg|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url?limit=100000"
        },
        {
            test: /\.css$/,
            loader: "style!css?modules",
            include: /flexboxgrid/
        }]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "src/scss")]
    },
    resolve: {
        alias: {
            jsHue: "jshue"
        }
    }
};

module.exports = config;
