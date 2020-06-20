const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const requestId = require('express-request-id')()

const docsRouter = require('./routes/docs')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(requestId)

// requestID + Apache Combined
const morganFormat = '":id" - :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
app.use(morgan(morganFormat))
morgan.token('id', (req) => { return req.id })

app.use('/docs', docsRouter)

module.exports = app
