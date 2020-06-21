'use strict'

const express = require('express')
const swaggerPath = require('swagger-ui-dist').getAbsoluteFSPath()
const config = require('../config')

const router = express.Router()

router.get('/', (req, res, next) => {
  if (req.url === '/') {
    return res.redirect(`${config.rootPath}/docs/?url=${config.rootPath}/specs/world-downloads.yml`)
  }
  next()
})

router.use('/', express.static(swaggerPath))

module.exports = router
