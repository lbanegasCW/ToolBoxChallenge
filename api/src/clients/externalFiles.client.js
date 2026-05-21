/**
 * HTTP client for the external files API.
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
 * @returns {Promise<any>} External API response body as received.
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
 * @param {string} fileName File name to fetch.
 * @returns {Promise<string>} Raw CSV content as a string.
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
