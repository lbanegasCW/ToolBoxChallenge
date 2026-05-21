/* global describe it before after beforeEach afterEach */

const nock = require('nock')
const { expect } = require('chai')

const { mockFilesList, mockFileContent } = require('./helpers/externalApiMocks')
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

    mockFilesList(payload)

    const result = await getFilesList()

    expect(result).to.deep.equal(payload)
    expect(nock.isDone()).to.equal(true)
  })

  it('gets raw file content as text', async () => {
    const csv = 'foo,bar\n1,2\n'

    mockFileContent('file1.csv', csv)

    const result = await getFileContent('file1.csv')

    expect(result).to.equal(csv)
    expect(nock.isDone()).to.equal(true)
  })

  it('throws a normalized error when the list request fails', async () => {
    mockFilesList({ error: 'boom' }, 500)

    try {
      await getFilesList()
      throw new Error('Expected getFilesList to fail')
    } catch (error) {
      expect(error.message).to.match(/getFilesList failed with status 500/)
    }

    expect(nock.isDone()).to.equal(true)
  })

  it('throws a normalized error when the file request fails', async () => {
    mockFileContent('missing.csv', { error: 'missing' }, 404)

    try {
      await getFileContent('missing.csv')
      throw new Error('Expected getFileContent to fail')
    } catch (error) {
      expect(error.message).to.match(/getFileContent failed with status 404/)
    }

    expect(nock.isDone()).to.equal(true)
  })
})
