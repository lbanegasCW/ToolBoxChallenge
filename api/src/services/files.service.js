/**
 * Files service for aggregating external CSV data.
 *
 * Responsibilities:
 * - Orchestrate the external client and CSV parser.
 * - Aggregate all available files for `GET /files/data`.
 * - Support fetching a single file when `fileName` is provided.
 * - Tolerate per-file download errors in the bulk flow by skipping only the
 *   failing file and continuing with the rest.
 * - Convert upstream failures into controlled service errors for the controller
 *   layer.
 *
 * File-level tolerance is intentional: one failed CSV must not prevent the
 * rest of the result set from being returned for the general `/files/data`
 * endpoint.
 * @module services/files
 */

const { getFilesList, getFileContent } = require('../clients/externalFiles.client')
const { parseCsvContent } = require('../utils/csvParser')

function createServiceError (message, status, cause) {
  const error = new Error(message)
  error.status = status
  error.cause = cause
  return error
}

async function fetchAndParseFile (fileName, shouldThrowOnFailure) {
  try {
    const csvContent = await getFileContent(fileName)
    return parseCsvContent(fileName, csvContent)
  } catch (error) {
    if (shouldThrowOnFailure) {
      throw createServiceError('Unable to retrieve file content', 500, error)
    }

    return null
  }
}

/**
 * Gets the normalized files data payload for the challenge endpoint.
 *
 * Behavior:
 * - Fetches the file list from the external API.
 * - If `fileName` is provided, fetches only that file.
 * - Otherwise fetches each file independently.
 * - Skips files that fail to download.
 * - Parses every downloaded CSV using the strict CSV parser.
 * - Keeps files with zero valid rows as `{ file, lines: [] }`.
 *
 * @param {string} [fileName] Optional file name to fetch exclusively.
 * @returns {Promise<Array>} Aggregated files data.
 * @throws {Error} Throws a controlled 500 error when the file list cannot be
 * retrieved or when the requested single file cannot be downloaded.
 */
async function getFilesData (fileName) {
  if (typeof fileName === 'string' && fileName.trim() !== '') {
    return [await fetchAndParseFile(fileName, true)]
  }

  let filesListResponse

  try {
    filesListResponse = await getFilesList()
  } catch (error) {
    throw createServiceError('Unable to retrieve files list', 500, error)
  }

  const fileNames = Array.isArray(filesListResponse.files)
    ? filesListResponse.files
    : []

  const parsedFiles = await Promise.all(
    fileNames.map((name) => fetchAndParseFile(name, false))
  )

  return parsedFiles.filter(Boolean)
}

/**
 * Gets the files list payload exactly as returned by the external API.
 *
 * This is used by `GET /files/list` and intentionally returns the upstream
 * body without shaping it.
 *
 * @returns {Promise<{files: string[]}>} External files list body.
 * @throws {Error} Throws a normalized upstream error when the request fails.
 */
async function getFilesListPayload () {
  return getFilesList()
}

module.exports = {
  getFilesData,
  getFilesListPayload
}
