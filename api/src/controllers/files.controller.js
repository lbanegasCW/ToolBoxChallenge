/**
 * Files controller for HTTP request handling.
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
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 * @param {import('express').NextFunction} next Express next function.
 * @returns {Promise<void>} Resolves when the response is sent.
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
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 * @param {import('express').NextFunction} next Express next function.
 * @returns {Promise<void>} Resolves when the response is sent.
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
