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

function corsMiddleware (_req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
}

app.use(express.json())
app.use(corsMiddleware)
app.options('*', function handleOptions (_req, res) {
  res.sendStatus(204)
})
app.use(routes)
app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app
