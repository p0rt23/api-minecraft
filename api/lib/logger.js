'use strict'

const bunyan = require('bunyan')
const config = require('../config')

module.exports = bunyan.createLogger({
  name: config.app_name,
  level: 'debug'
})
