'use strict'

let express = require('express')
let bodyParser = require('body-parser').json()
let dbsrvPort = 8000
let authsrvPort = 8001

module.exports = function () {
  let dbsrv = express()
  dbsrv.listen(dbsrvPort, 'localhost', function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('Running dbsrv at localhost:' + dbsrvPort)
    }
  })

  let authsrv = express()
  authsrv.listen(authsrvPort, 'localhost', function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('Running authsrv at localhost:' + authsrvPort)
    }
  })
}
