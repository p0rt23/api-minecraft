'use strict'

const bunyan = require('bunyan')
const config = require('../config')

module.exports = bunyan.createLogger({
<<<<<<< HEAD
  name: config.app_name,
=======
  name: config.appName,
>>>>>>> develop
  level: 'debug'
})
