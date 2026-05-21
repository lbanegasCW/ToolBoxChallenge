/**
 * Express application factory for the API.
 * @module app
 */

const express = require('express')
const routes = require('./routes')
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler')

const app = express()

app.use(express.json())
app.use(routes)
app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app
