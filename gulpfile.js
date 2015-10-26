'use strict';

let path = require('path');
let gulp = require('gulp');
let gutil = require('gulp-util');
let del = require('del');
let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let conf = require('./config');
let webpackConf = require('./webpack.config');
let fs = require('fs-extra');
let tap = require('gulp-tap');

gulp.task('icons', function(cb) {
    var replaceAll = function(s, target, replacement) {
      var array = s.split(target);
      return array.join(replacement);
    };

    var svgs = {};
    var stream = gulp.src('node_modules/material-design-icons/**/svg/production/*24px.svg')
        .pipe(tap(function(p) {

            var dirname = path.relative('.', p.path);
            var basename = path.basename(p.path);

            dirname = dirname.split("/")[3];

            var svg;
            if (svgs[dirname])
              svg = svgs[dirname];
            else
              svg = '<svg>\n';

            basename = basename.split('_24px')[0]
            basename = replaceAll(basename, '_', '-');
            basename = replaceAll(basename, 'ic-', '');
            gutil.log("Processing " + basename);
            svg = svg + '<g id="'+basename+'">\n';
            svg = svg + '\t' + p.contents;
            svg = svg + '\n</g>\n';

            svgs[dirname] = svg;
        }));

    stream.on('end', function() {
      for (var i in svgs) {
        var ws = fs.createOutputStream(path.join(conf.target, 'icons', 'icons.svg'));
        ws.write(svgs[i]+'\n</svg>');
        cb()
      }
    });
});

gulp.task('prepare', function(cb) {
    del('target').then(function() {
        gulp.src(path.join(conf.src, 'index.html'))
            .pipe(gulp.dest(conf.target));

        gulp.src(path.join('node_modules', 'clndr', 'clndr.min.js'))
            .pipe(gulp.dest(conf.target));

        cb();
    });
});

gulp.task('build', ['prepare', 'icons'], function(cb) {
    let prodOptions = Object.create(webpackConf);

    prodOptions.plugins = prodOptions.plugins || [];
    prodOptions.plugins.push(new webpack.optimize.UglifyJsPlugin({mangle: false}));
    prodOptions.plugins.push(new webpack.optimize.DedupePlugin());

    webpack(prodOptions, function(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err)
        }

        gutil.log('[webpack]', stats.toString({
            colors: true
        }));

        cb();
    });
});

gulp.task('debug', ['prepare', 'icons'], function(cb) {
    let debugOptions = Object.create(webpackConf);
    debugOptions.entry = [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/dev-server',
        debugOptions.entry
    ];

    debugOptions.debug = true;
    debugOptions.devtool = 'eval-source-map';
    debugOptions.output.publicPath = 'http://localhost:8080/';

    debugOptions.plugins = debugOptions.plugins || [];
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

        cb();
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
    });
});
