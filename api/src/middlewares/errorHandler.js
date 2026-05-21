/**
 * Centralized error handling middleware.
 *
 * Responsibilities:
 * - Convert unmatched routes into a 404 error.
 * - Convert thrown errors into normalized JSON responses.
 * - Keep the rest of the application free from response-format concerns.
 * @module middlewares/errorHandler
 */

/**
 * Handles unmatched routes with a 404 response.
 *
 * @param {import('express').Request} _req Express request object.
 * @param {import('express').Response} _res Express response object.
 * @param {import('express').NextFunction} next Express next function.
 * @returns {void}
 */
function notFoundHandler (_req, _res, next) {
  const error = new Error('Route not found')
  error.status = 404
  next(error)
}

/**
 * Sends a normalized JSON error response.
 *
 * The response body follows the shape `{ error: string }`.
 *
 * @param {Error & {status?: number}} err Error instance.
 * @param {import('express').Request} _req Express request object.
 * @param {import('express').Response} res Express response object.
 * @param {import('express').NextFunction} _next Express next function.
 * @returns {void}
 */
function errorHandler (err, _req, res, _next) {
  const status = err.status || 500
  const message = err.status ? err.message : 'Internal Server Error'

  res.status(status).json({ error: message })
}

module.exports = {
  notFoundHandler,
  errorHandler
}
