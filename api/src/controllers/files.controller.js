/**
 * Files controller for HTTP request handling.
 *
 * Responsibilities:
 * - Validate request-specific input such as `fileName`.
 * - Delegate data fetching to the service layer.
 * - Send JSON responses with the proper HTTP status code.
 * - Forward failures to the centralized error handler.
 * @module controllers/files
 */

const filesService = require('../services/files.service')

function createRequestError (message, status) {
  const error = new Error(message)
  error.status = status
  return error
}

function getFileNameFromQuery (query) {
  const value = query.fileName

  if (Array.isArray(value)) return value[0]
  return value
}

/**
 * Handles GET /files/list.
 *
 * The response body matches the upstream API exactly.
 *
 * @param {import('express').Request} _req Express request object.
 * @param {import('express').Response} res Express response object.
 * @param {import('express').NextFunction} next Express next function.
 * @returns {Promise<void>} Resolves when the response is sent.
 * @throws {Error} Forwards service errors to Express error middleware.
 */
async function getFilesList (_req, res, next) {
  try {
    const data = await filesService.getFilesListPayload()
    res.json(data)
  } catch (error) {
    next(error)
  }
}

/**
 * Handles GET /files/data.
 *
 * When `fileName` is omitted, the controller returns the aggregated data for
 * all available files. When `fileName` is present, only that specific file is
 * downloaded and parsed.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 * @param {import('express').NextFunction} next Express next function.
 * @returns {Promise<void>} Resolves when the response is sent.
 * @throws {Error} Sends a 400 error when `fileName` is present but empty, or
 * forwards service errors to Express middleware.
 */
async function getFilesData (req, res, next) {
  try {
    const fileName = getFileNameFromQuery(req.query)

    if (typeof fileName === 'string' && fileName.trim() === '') {
      throw createRequestError('fileName is required', 400)
    }

    const data = await filesService.getFilesData(fileName)
    res.json(data)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getFilesList,
  getFilesData
}
