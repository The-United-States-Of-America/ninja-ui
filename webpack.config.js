'use strict';

let path = require('path');
let webpack = require('webpack');
let config = require('./config');

module.exports = {
    entry: path.join(process.cwd(), config.src, config.js.src),
    output: {
        path: path.join(process.cwd(), config.target),
        filename: config.js.target
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel?optional[]=runtime&stage=0',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                loader: 'style!css?sourceMap',
                exclude: /src/
            }, {
                test: /\.css$/,
                loader: 'style!css?module&sourceMap!cssnext',
                exclude: /node_modules/
            }, {
                test: /\.html$/,
                loader: 'html'
            }, {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }
        ]
    },
    resolve: {
        extensions: ['', '.jsx', '.js', '.json'],
        modulesDirectories: ['node_modules']
    },
    cssnext: {
        browsers: "last 2 versions"
    }
};
