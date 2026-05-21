/**
 * CSV parser for strict challenge file rows.
 *
 * Responsibilities:
 * - Parse raw CSV text without external CSV dependencies.
 * - Ignore the header row.
 * - Ignore empty lines.
 * - Discard malformed rows instead of throwing, so callers can keep processing
 *   the remaining content.
 *
 * Validation rules for each data row:
 * - Exactly 4 comma-separated columns are required.
 * - `file` must be non-empty after trimming.
 * - `text` must be non-empty after trimming.
 * - `number` must convert to a finite JavaScript number.
 * - `hex` must match `/^[a-fA-F0-9]{32}$/`.
 * - Rows failing any rule are ignored.
 * @module utils/csvParser
 */

const HEX_PATTERN = /^[a-fA-F0-9]{32}$/

function isNonEmptyString (value) {
  return typeof value === 'string' && value.trim() !== ''
}

function parseLine (line) {
  const columns = line.split(',')

  if (columns.length !== 4) return null

  const file = columns[0].trim()
  const text = columns[1].trim()
  const numberValue = columns[2].trim()
  const hex = columns[3].trim()
  const number = Number(numberValue)

  if (!isNonEmptyString(file)) return null
  if (!isNonEmptyString(text)) return null
  if (!numberValue || !Number.isFinite(number)) return null
  if (!HEX_PATTERN.test(hex)) return null

  return {
    text,
    number,
    hex
  }
}

/**
 * Parses the content of a strict CSV file.
 *
 * Validation rules:
 * - The first non-empty line is treated as the header and ignored.
 * - Empty lines are ignored before and between data rows.
 * - Every data row must have exactly 4 comma-separated columns.
 * - `file` and `text` must be non-empty after trimming.
 * - `number` must be convertible to a finite numeric value.
 * - `hex` must be a hexadecimal string with exactly 32 characters.
 * - Invalid rows are discarded silently.
 *
 * @param {string} fileName File name associated with the CSV content.
 * @param {string} csvContent Raw CSV text.
 * @returns {{file: string, lines: Array<{text: string, number: number, hex: string}>}} Parsed CSV payload.
 * @throws {Error} Does not throw on malformed CSV rows; only invalid input
 * types from callers would be programmer errors.
 */
function parseCsvContent (fileName, csvContent) {
  if (!isNonEmptyString(csvContent)) {
    return { file: fileName, lines: [] }
  }

  const lines = csvContent
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line !== '')

  if (lines.length === 0) {
    return { file: fileName, lines: [] }
  }

  const dataLines = lines.slice(1)
  const parsedLines = dataLines
    .map(parseLine)
    .filter(Boolean)

  return {
    file: fileName,
    lines: parsedLines
  }
}

module.exports = {
  parseCsvContent
}
