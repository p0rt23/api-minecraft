'use strict'

const express = require('express')
const fs = require('fs').promises
const config = require('../config')
const path = require('path')

const router = express.Router()

router.get('/', function (req, res, next) {
  const dir = config.worldDownloadsPath
  fs.readdir(dir).then(dirFiles => {
    return dirFiles.map(file => {
      const filePath = path.join(dir, file)
      return fs.stat(filePath).then(stats => {
        if (stats.isFile()) {
          return { name: file, modifiedMs: stats.mtimeMs }
        }
      }).catch(next)
    })
  }).then(fileStats => {
    Promise.all(fileStats).then(files => {
      res.json(
        files
          .sort((b, a) => a.modifiedMs - b.modifiedMs)
          .map(o => o.name)
          .slice(0, 10)
      )
    }).catch(next)
  }).catch(next)
})

module.exports = router
