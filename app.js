const express = require('express')
const swaggerPath = require('swagger-ui-dist').absolutePath()

const app = express()
app.use(express.static(swaggerPath))

app.listen(3000)
