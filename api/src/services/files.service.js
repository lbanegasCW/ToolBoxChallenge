/**
 * Files service for aggregating external CSV data.
 * @module services/files
 */

const { getFilesList, getFileContent } = require('../clients/externalFiles.client')
const { parseCsvContent } = require('../utils/csvParser')

/**
 * Gets the normalized files data payload for the challenge endpoint.
 *
 * Behavior:
 * - Fetches the file list from the external API.
 * - Fetches each file independently.
 * - Skips files that fail to download.
 * - Parses every downloaded CSV using the strict CSV parser.
 * - Keeps files with zero valid rows as `{ file, lines: [] }`.
 *
 * @returns {Promise<Array<{file: string, lines: Array<{text: string, number: number, hex: string}>}>>} Aggregated files data.
 * @throws {Error} Throws a controlled 500 error when the file list cannot be retrieved.
 */
async function getFilesData () {
  let filesListResponse

  try {
    filesListResponse = await getFilesList()
  } catch (error) {
    const serviceError = new Error('Unable to retrieve files list')
    serviceError.status = 500
    serviceError.cause = error
    throw serviceError
  }

  const fileNames = Array.isArray(filesListResponse.files) ? filesListResponse.files : []

  const parsedFiles = await Promise.all(fileNames.map(async (fileName) => {
    try {
      const csvContent = await getFileContent(fileName)
      return parseCsvContent(fileName, csvContent)
    } catch {
      return null
    }
  }))

  return parsedFiles.filter(Boolean)
}

module.exports = {
  getFilesData
}
