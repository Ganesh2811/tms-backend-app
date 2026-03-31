const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    mode: "production",
    target: "node",
    entry: path.resolve(__dirname, "app.js"),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "app.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".js"],
    },
    externals: [nodeExternals()],
};