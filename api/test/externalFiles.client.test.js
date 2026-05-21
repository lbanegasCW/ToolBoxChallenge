const nock = require('nock')
const { expect } = require('chai')

const { baseUrl, apiKey } = require('../src/config/externalApi.config')
const { getFilesList, getFileContent } = require('../src/clients/externalFiles.client')

describe('externalFiles.client', () => {
  before(() => {
    nock.disableNetConnect()
  })

  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  after(() => {
    nock.enableNetConnect()
  })

  it('gets the files list from the external API', async () => {
    const payload = { files: ['file1.csv', 'file2.csv'] }

    const scope = nock(baseUrl, {
      reqheaders: {
        authorization: apiKey
      }
    })
      .get('/files')
      .reply(200, payload)

    const result = await getFilesList()

    expect(result).to.deep.equal(payload)
    scope.done()
  })

  it('gets raw file content as text', async () => {
    const csv = 'foo,bar\n1,2\n'

    const scope = nock(baseUrl, {
      reqheaders: {
        authorization: apiKey
      }
    })
      .get('/file/file1.csv')
      .reply(200, csv)

    const result = await getFileContent('file1.csv')

    expect(result).to.equal(csv)
    scope.done()
  })

  it('throws a normalized error when the list request fails', async () => {
    nock(baseUrl)
      .get('/files')
      .reply(500, { error: 'boom' })

    try {
      await getFilesList()
      throw new Error('Expected getFilesList to fail')
    } catch (error) {
      expect(error.message).to.match(/getFilesList failed with status 500/)
    }
  })

  it('throws a normalized error when the file request fails', async () => {
    nock(baseUrl)
      .get('/file/missing.csv')
      .reply(404, { error: 'missing' })

    try {
      await getFileContent('missing.csv')
      throw new Error('Expected getFileContent to fail')
    } catch (error) {
      expect(error.message).to.match(/getFileContent failed with status 404/)
    }
  })
})
