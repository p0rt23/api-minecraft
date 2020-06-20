'use strict'

require('dotenv').config()
const packageJson = require('./package.json')

const common = {
  app_name: packageJson.name
}

const config = {
  development: {},
  test: {},
  production: {}
}

module.exports = { ...common, ...config[process.env.NODE_ENV || 'development'] }
