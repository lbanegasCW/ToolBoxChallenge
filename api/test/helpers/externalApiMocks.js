const nock = require('nock')

const { baseUrl, apiKey } = require('../../src/config/externalApi.config')

function externalApiScope () {
  return nock(baseUrl, {
    reqheaders: {
      authorization: apiKey
    }
  })
}

function mockFilesList (payload, status = 200) {
  return externalApiScope()
    .get('/files')
    .reply(status, payload)
}

function mockFileContent (fileName, payload, status = 200) {
  return externalApiScope()
    .get(`/file/${encodeURIComponent(fileName)}`)
    .reply(status, payload)
}

module.exports = {
  mockFilesList,
  mockFileContent
}
