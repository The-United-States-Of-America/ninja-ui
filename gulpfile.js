'use strict'
let path = require('path')
let gulp = require('gulp')
let gutil = require('gulp-util')
let webpack = require('webpack')
let conf = require('./webpack.config')
let del = require('del')
let express = require('express')
let babel = require('gulp-babel')

gulp.task('prepare', function (cb) {
  del('target').then(function () {
    gulp.src(path.join('src', 'index.html'))
      .pipe(gulp.dest('target'))
      .on('end', function () {
        gulp.src('resources/**')
          .pipe(gulp.dest('target'))
          .on('end', cb)
      })
  })
})

gulp.task('build', ['prepare'], function (callback) {
  process.env.NODE_ENV = 'production'
  let prodConf = Object.create(conf)

  prodConf.plugins = prodConf.plugins || []
  prodConf.plugins.push(new webpack.optimize.UglifyJsPlugin())
  prodConf.plugins.push(new webpack.DefinePlugin({
    'NODE_ENV': 'production',
    'DEBUG': false
  }))

  webpack(prodConf, function (err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err)
    }

    gutil.log('[webpack]', stats.toString({
      colors: true
    }))

    callback()
  })
})

gulp.task('backend', function () {
  gulp.src('node_modules/ninja-backend-dbsrv/src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('node_modules/ninja-backend-dbsrv/dist'))
    .on('end', function () {
      gutil.log(`[${gutil.colors.grey('dbsrv')}]`, 'Starting Database Service')
      require('ninja-backend-dbsrv/dist/app')
    })

  gulp.src('node_modules/ninja-backend-authsrv/src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('node_modules/ninja-backend-authsrv/dist'))
    .on('end', function () {
      gutil.log(`[${gutil.colors.grey('authsrv')}]`, 'Starting Authentication Service')
      require('ninja-backend-authsrv/dist/app')
    })
})

gulp.task('ui', ['prepare'], function () {
  let devConf = Object.create(conf)

  devConf.plugins = devConf.plugins || []
  devConf.plugins.push(new webpack.HotModuleReplacementPlugin())
  devConf.plugins.push(new webpack.DefinePlugin({
    'NODE_ENV': 'development',
    'DEBUG': true
  }))

  devConf.entry = [devConf.entry] || []
  devConf.entry.push('webpack-hot-middleware/client')

  devConf.debug = true
  devConf.devtool = 'eval-source-map'

  let compiler = webpack(devConf)
  let app = express()

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: devConf.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
  }))

  app.use(require('webpack-hot-middleware')(compiler))

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'src', 'index.html'))
  })

  app.listen(3000, 'localhost', function (err) {
    if (err) {
      gutil.log(`[${gutil.colors.grey('ui')}]`, err)
    } else {
      gutil.log(`[${gutil.colors.grey('ui')}]`, 'Listening at', gutil.colors.cyan('http://localhost:3000'))
    }
  })
})

gulp.task('debug', ['backend', 'ui'])
gulp.task('default', ['build'])
