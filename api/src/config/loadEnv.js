/**
 * Local environment loader for the API.
 *
 * Responsibilities:
 * - Load variables from `api/.env` when present.
 * - Keep code defaults intact when a variable is missing.
 * - Avoid adding a hard dependency on a third-party env package.
 *
 * @module config/loadEnv
 */

const fs = require('fs')
const path = require('path')

const envPath = path.resolve(__dirname, '..', '..', '.env')

function parseEnvLine (line) {
  const trimmedLine = line.trim()

  if (trimmedLine === '' || trimmedLine.startsWith('#')) return null

  const equalsIndex = trimmedLine.indexOf('=')
  if (equalsIndex === -1) return null

  const key = trimmedLine.slice(0, equalsIndex).trim()
  let value = trimmedLine.slice(equalsIndex + 1).trim()

  if (!key) return null

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1)
  }

  return { key, value }
}

function loadEnv () {
  if (!fs.existsSync(envPath)) return

  const contents = fs.readFileSync(envPath, 'utf8')

  contents.split(/\r?\n/).forEach(function applyLine (line) {
    const entry = parseEnvLine(line)
    if (!entry) return
    if (typeof process.env[entry.key] === 'undefined') {
      process.env[entry.key] = entry.value
    }
  })
}

loadEnv()

module.exports = {
  loadEnv
}
