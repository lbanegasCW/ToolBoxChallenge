/**
 * HTTP service for files endpoints.
 *
 * Responsibilities:
 * - Resolve the API base URL with a safe default.
 * - Fetch file names from `GET /files/list`.
 * - Fetch files data from `GET /files/data`.
 * - Fetch a specific file when `fileName` is provided.
 *
 * The service does not depend on Redux; it only performs HTTP requests and
 * returns parsed JSON.
 *
 * @module features/files/filesService
 */

const DEFAULT_API_BASE_URL = 'http://localhost:3001'
const apiBaseUrl = (process.env.REACT_APP_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '')

function normalizeError (error) {
  const normalizedError = new Error(error.message || 'Request failed')
  normalizedError.status = error.status || 500
  return normalizedError
}

async function requestJson (path) {
  try {
    const response = await fetch(`${apiBaseUrl}${path}`)

    if (!response.ok) {
      throw normalizeError({
        message: `Request failed with status ${response.status}`,
        status: response.status
      })
    }

    return response.json()
  } catch (error) {
    throw normalizeError(error)
  }
}

/**
 * Fetches the list of available file names.
 *
 * @returns {Promise<{files: string[]}>} Files list payload.
 * @throws {Error} Throws when the request fails or returns a non-OK status.
 */
async function getFileNames () {
  return requestJson('/files/list')
}

/**
 * Fetches the parsed files data payload.
 *
 * When `fileName` is provided, the service requests a single file using the
 * query parameter expected by the backend.
 *
 * @param {string} [fileName] Optional file name to request.
 * @returns {Promise<Array>} Parsed files data payload.
 * @throws {Error} Throws when the request fails or returns a non-OK status.
 */
async function getFilesData (fileName) {
  const query = typeof fileName === 'string' && fileName.trim() !== ''
    ? `?fileName=${encodeURIComponent(fileName)}`
    : ''

  return requestJson(`/files/data${query}`)
}

module.exports = {
  getFileNames,
  getFilesData
}
