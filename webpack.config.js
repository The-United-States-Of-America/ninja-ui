'use strict';

let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = require('./config');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/dev-server',
        path.join(process.cwd(), config.src, config.js.src)
    ],
    output: {
        path: path.join(process.cwd(), config.target),
        filename: config.js.target
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader?optional[]=runtime&stage=0',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader?module!cssnext-loader')
            }, {
                test: /\.html$/,
                loader: 'html'
            }
        ]
    },
    resolve: {
        extensions: ['', '.jsx', '.js', '.json'],
        modulesDirectories: ['node_modules']
    },
    plugins: [
        new ExtractTextPlugin(config.css.target),
        new webpack.HotModuleReplacementPlugin()
    ]
};
