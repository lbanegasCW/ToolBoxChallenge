/**
 * Express application factory for the API.
 *
 * Responsibilities:
 * - Registers JSON parsing middleware.
 * - Mounts application routes.
 * - Installs centralized 404 and error handlers.
 *
 * The exported value is the configured Express application instance used by
 * both the server entrypoint and the test suite.
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
