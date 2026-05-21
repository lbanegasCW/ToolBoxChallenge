/**
 * Files controller for HTTP request handling.
 * @module controllers/files
 */

const filesService = require('../services/files.service')

/**
 * Handles GET /files/data.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 * @param {import('express').NextFunction} next Express next function.
 * @returns {Promise<void>} Resolves when the response is sent.
 */
async function getFilesData (_req, res, next) {
  try {
    const data = await filesService.getFilesData()
    res.json(data)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getFilesData
}
