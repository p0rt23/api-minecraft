'use strict'

require('dotenv').config()
const packageJson = require('./package.json')

const common = {
  appName: packageJson.name
}

const config = {
  development: {
    env: 'development',
    docsEnabled: true
  },
  test: {
    env: 'test',
    docsEnabled: true
  },
  production: {
    env: 'production',
    docsEnabled: false
  }
}
const env = process.env.NODE_ENV || 'development'
module.exports = { ...common, ...config[env] }
