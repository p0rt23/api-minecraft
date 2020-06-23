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
    docsEnabled: true,
    worldDownloadsPath: 'tmp'
  },
  test: {
    env: 'test',
    rootPath: `/${common.appName}`,
    docsEnabled: true,
    worldDownloadsPath: '/minecraft-backups'
  },
  production: {
    env: 'production',
    rootPath: `/${common.appName}`,
    docsEnabled: false,
    worldDownloadsPath: '/minecraft-backups'
  }
}
const env = process.env.NODE_ENV || 'development'
module.exports = { ...common, ...config[env] }
