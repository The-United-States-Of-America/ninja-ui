'use strict';

let path = require('path');
let gulp = require('gulp');
let gutil = require('gulp-util');
let minimist = require('minimist');
let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');

let conf = require('./config');
let webpackConf = require('./webpack.config');

function prepare() {
    gulp.src(path.join(conf.src, 'index.html'))
        .pipe(gulp.dest(conf.target));
}

function build(callback) {
    webpack(webpackConf, function(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err)
        }

        gutil.log('[webpack]', stats.toString({
            colors: true
        }));
        callback();
    });
}

function watch() {
    let debugOptions = Object.create(webpackConf);
    debugOptions.entry = [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/dev-server',
        debugOptions.entry
    ];

    debugOptions.debug = true;
    debugOptions.devtool = 'eval';
    debugOptions.output.publicPath = 'http://localhost:8080/';
    debugOptions.plugins.push(new webpack.HotModuleReplacementPlugin());

    let compiler = webpack(debugOptions);
    new WebpackDevServer(compiler, {
        contentBase: './target/',
        hot: true,
        inline: true,
        stats: {
            colors: true
        }
    }).listen(8080, 'localhost', function(err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }

        gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
    });
}

gulp.task('prepare', prepare);
gulp.task('build', ['prepare'], build);
gulp.task('watch', ['build'], watch);
