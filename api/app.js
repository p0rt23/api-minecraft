'use strict'

const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const requestId = require('express-request-id')()
const promBundle = require('express-prom-bundle')
const config = require('./config')
const log = require('./lib/logger')

log.info(`Node Environment: ${config.env}`)
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(requestId)

// requestID + Apache Combined
const morganFormat = '":id" - :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
app.use(morgan(morganFormat))
morgan.token('id', (req) => { return req.id })

// Prometheus: /metrics
const metrics = promBundle({ includePath: true })
app.use(metrics)

// Docs and Specs
if (config.docsEnabled) {
  log.info('/docs and /specs are public')
  app.use(`${config.rootPath}/docs`, require('./routes/docs'))
  app.use(`${config.rootPath}/specs`, require('./routes/specs'))
}

const v1 = express.Router()
v1.use('/world-downloads', require('./routes/world-downloads-v1'))

app.use(`${config.rootPath}/v1`, v1)

module.exports = app
