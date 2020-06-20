'use strict'

const express = require('express')
const swaggerPath = require('swagger-ui-dist').getAbsoluteFSPath()

const router = express.Router()

router.use('/', express.static(swaggerPath))

module.exports = router
