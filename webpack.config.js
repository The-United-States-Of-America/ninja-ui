'use strict';

let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

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
                loader: ExtractTextPlugin.extract('css?module!cssnext'),
                exclude: /node_modules/
            }, {
                test: /\.html$/,
                loader: 'html'
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css')
            }
        ]
    },
    resolve: {
        extensions: ['', '.jsx', '.js', '.json'],
        modulesDirectories: ['node_modules']
    },
    plugins: [
        new ExtractTextPlugin(config.css.target)
    ]
};
