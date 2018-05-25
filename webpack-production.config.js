const webpack = require("webpack");
const happyPack = require("happypack");
const path = require("path");
const nodeModulesPath = path.resolve(__dirname, "node_modules");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OccurenceOrderPlugin = require("webpack/lib/optimize/OccurenceOrderPlugin");
const DedupePlugin = require("webpack/lib/optimize/DedupePlugin");
const AggressiveMergingPlugin = require("webpack/lib/optimize/AggressiveMergingPlugin");

const config = {
    entry: [
        "babel-polyfill",
        path.join(__dirname, "/src/js/app.js")
    ],
    output: {
        filename: "www/app.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env":{
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new happyPack({
            loaders: ["babel"],
            threads: 4
        }),
        new OccurenceOrderPlugin(),
        new DedupePlugin(),
        new AggressiveMergingPlugin(),
        new CopyWebpackPlugin([{
                from: "src",
                to: "www"
            }], {
                ignore: [
                    "*.js",
                    ".DS_Store"
                ]
            }
        )
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
    resolve: {
        alias: {
            jsHue: "jshue"
        }
    }
};

module.exports = config;
