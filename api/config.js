'use strict'

require('dotenv').config()
const packageJson = require('./package.json')

const common = {
  appName: packageJson.name
}

const config = {
  development: {
    env: 'development',
    rootPath: '',
    docsEnabled: true
  },
  test: {
    env: 'test',
    rootPath: `/${common.appName}`,
    docsEnabled: true
  },
  production: {
    env: 'production',
    rootPath: `/${common.appName}`,
    docsEnabled: false
  }
}
const env = process.env.NODE_ENV || 'development'
module.exports = { ...common, ...config[env] }
