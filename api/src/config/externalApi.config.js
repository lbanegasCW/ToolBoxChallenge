/**
 * External API configuration helpers.
 * @module config/externalApi
 */

require('./loadEnv')

const DEFAULT_BASE_URL = 'https://echo-serv.tbxnet.com/v1/secret'
const DEFAULT_API_KEY = 'Bearer aSuperSecretKey'

function normalizeBearerToken (value, fallback) {
  if (!value) return fallback

  return value.startsWith('Bearer ')
    ? value
    : `Bearer ${value}`
}

/**
 * External API base URL.
 * @type {string}
 */
const baseUrl = process.env.EXTERNAL_API_BASE_URL || DEFAULT_BASE_URL

/**
 * External API authorization header value.
 * @type {string}
 */
const apiKey = normalizeBearerToken(process.env.EXTERNAL_API_KEY, DEFAULT_API_KEY)

module.exports = {
  baseUrl,
  apiKey
}
