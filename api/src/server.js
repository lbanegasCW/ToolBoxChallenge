/**
 * HTTP server entrypoint for the API.
 *
 * Responsibilities:
 * - Imports the configured Express application.
 * - Starts listening on the configured port.
 * - Uses a default port so the server can run without required environment
 *   variables.
 *
 * @module server
 */

require('./config/loadEnv')

const app = require('./app')

const port = process.env.PORT || 3001

/**
 * Starts the HTTP server.
 *
 * @returns {import('http').Server} Node HTTP server instance.
 * @throws {Error} Propagates startup errors from the Node HTTP server.
 */
function startServer () {
  return app.listen(port)
}

startServer()

module.exports = {
  startServer
}
