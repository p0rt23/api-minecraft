'use strict'

const express = require('express')

const router = express.Router()
router.use('/', express.static('specs'))

module.exports = router
