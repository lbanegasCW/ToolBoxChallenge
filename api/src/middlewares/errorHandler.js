/**
 * Centralized error handling middleware.
 * @module middlewares/errorHandler
 */

/**
 * Handles unmatched routes with a 404 response.
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 * @param {import('express').NextFunction} next Express next function.
 */
function notFoundHandler (_req, _res, next) {
  const error = new Error('Route not found')
  error.status = 404
  next(error)
}

/**
 * Sends a normalized JSON error response.
 * @param {Error & {status?: number}} err Error instance.
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 * @param {import('express').NextFunction} next Express next function.
 */
function errorHandler (err, _req, _res, _next) {
  const status = err.status || 500
  const message = status === 500 ? 'Internal Server Error' : err.message

  res.status(status).json({ error: message })
}

module.exports = {
  notFoundHandler,
  errorHandler
}
