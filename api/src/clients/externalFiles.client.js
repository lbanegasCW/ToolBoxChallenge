/**
 * HTTP client for the external files API.
 *
 * Responsibilities:
 * - Build an Axios client with the external base URL and authorization header.
 * - Fetch the remote file listing.
 * - Fetch an individual CSV file as raw text.
 * - Normalize Axios failures into plain `Error` instances so callers remain
 *   decoupled from transport details.
 *
 * Errors are normalized to a concise message that includes the operation and,
 * when available, the HTTP status code returned by the remote service.
 * @module clients/externalFiles
 */

const axios = require('axios')
const { baseUrl, apiKey } = require('../config/externalApi.config')

const httpClient = axios.create({
  baseURL: baseUrl,
  headers: {
    authorization: apiKey
  }
})

function buildAxiosErrorMessage (error, operation) {
  if (error.response) {
    const status = error.response.status
    const detail = typeof error.response.data === 'string'
      ? error.response.data
      : JSON.stringify(error.response.data)

    return `${operation} failed with status ${status}: ${detail}`
  }

  if (error.request) {
    return `${operation} failed: no response received from external API`
  }

  return `${operation} failed: ${error.message}`
}

function rethrowNormalizedError (error, operation) {
  const normalizedError = new Error(buildAxiosErrorMessage(error, operation))
  normalizedError.cause = error
  throw normalizedError
}

/**
 * Returns the list of files from the external API.
 *
 * The response body is returned exactly as received from the upstream API.
 *
 * @returns {Promise<{files: string[]}>} External API response body as received.
 * @throws {Error} Throws a normalized error when the upstream request fails.
 */
async function getFilesList () {
  try {
    const response = await httpClient.get('/files')
    return response.data
  } catch (error) {
    rethrowNormalizedError(error, 'getFilesList')
  }
}

/**
 * Returns the raw CSV content for a file from the external API.
 *
 * The content is requested as plain text so the parser can apply its own CSV
 * validation rules.
 *
 * @param {string} fileName File name to fetch.
 * @returns {Promise<string>} Raw CSV content as a string.
 * @throws {Error} Throws a normalized error when the upstream request fails.
 */
async function getFileContent (fileName) {
  try {
    const response = await httpClient.get(`/file/${encodeURIComponent(fileName)}`, {
      responseType: 'text'
    })

    return response.data
  } catch (error) {
    rethrowNormalizedError(error, 'getFileContent')
  }
}

module.exports = {
  getFilesList,
  getFileContent
}
