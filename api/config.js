'use strict'

require('dotenv').config()
const packageJson = require('./package.json')

const common = {
  app_name: packageJson.name
}

const config = {
  development: {
    docsEnabled: true
  },
  test: {
    docsEnabled: true
  },
  production: {
    docsEnabled: false
  }
}
const env = process.env.NODE_ENV || 'development'
module.exports = { ...common, ...config[env] }
