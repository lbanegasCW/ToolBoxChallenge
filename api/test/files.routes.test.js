const nock = require('nock')
const request = require('supertest')
const { expect } = require('chai')

const app = require('../src/app')
const { mockFilesList, mockFileContent } = require('./helpers/externalApiMocks')

describe('files routes', () => {
  before(() => {
    nock.disableNetConnect()
  })

  after(() => {
    nock.enableNetConnect()
  })

  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('returns aggregated data for several files', async () => {
    mockFilesList({ files: ['file1.csv', 'file2.csv'] })
    mockFileContent('file1.csv', [
      'file,text,number,hex',
      'file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765'
    ].join('\n'))
    mockFileContent('file2.csv', [
      'file,text,number,hex',
      'file2.csv,Another,123456789,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    ].join('\n'))

    const response = await request(app)
      .get('/files/data')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).to.deep.equal([
      {
        file: 'file1.csv',
        lines: [
          {
            text: 'RgTya',
            number: 64075909,
            hex: '70ad29aacf0b690b0467fe2b2767f765'
          }
        ]
      },
      {
        file: 'file2.csv',
        lines: [
          {
            text: 'Another',
            number: 123456789,
            hex: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
          }
        ]
      }
    ])
    expect(nock.isDone()).to.equal(true)
  })

  it('returns a single parsed file when fileName is provided', async () => {
    mockFileContent('file1.csv', [
      'file,text,number,hex',
      'file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765'
    ].join('\n'))

    const response = await request(app)
      .get('/files/data')
      .query({ fileName: 'file1.csv' })
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).to.deep.equal([
      {
        file: 'file1.csv',
        lines: [
          {
            text: 'RgTya',
            number: 64075909,
            hex: '70ad29aacf0b690b0467fe2b2767f765'
          }
        ]
      }
    ])
    expect(nock.isDone()).to.equal(true)
  })

  it('returns a controlled 400 error when fileName is empty', async () => {
    const response = await request(app)
      .get('/files/data')
      .query({ fileName: '' })
      .expect(400)
      .expect('Content-Type', /json/)

    expect(response.body).to.deep.equal({
      error: 'fileName is required'
    })
    expect(nock.isDone()).to.equal(true)
  })

  it('returns a controlled error when the requested file fails to download', async () => {
    mockFileContent('file1.csv', { error: 'download failed' }, 500)

    const response = await request(app)
      .get('/files/data')
      .query({ fileName: 'file1.csv' })
      .expect(500)
      .expect('Content-Type', /json/)

    expect(response.body).to.deep.equal({
      error: 'Unable to retrieve file content'
    })
    expect(nock.isDone()).to.equal(true)
  })

  it('returns the external files list from /files/list', async () => {
    const payload = { files: ['file1.csv', 'file2.csv'] }

    mockFilesList(payload)

    const response = await request(app)
      .get('/files/list')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).to.deep.equal(payload)
    expect(nock.isDone()).to.equal(true)
  })

  it('returns a single parsed file when fileName is provided', async () => {
    nock(baseUrl, {
      reqheaders: {
        authorization: apiKey
      }
    })
      .get('/file/file1.csv')
      .reply(200, [
        'file,text,number,hex',
        'file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765'
      ].join('\n'))

    const response = await request(app)
      .get('/files/data')
      .query({ fileName: 'file1.csv' })
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).to.deep.equal([
      {
        file: 'file1.csv',
        lines: [
          {
            text: 'RgTya',
            number: 64075909,
            hex: '70ad29aacf0b690b0467fe2b2767f765'
          }
        ]
      }
    ])
  })

  it('returns a controlled 400 error when fileName is empty', async () => {
    const response = await request(app)
      .get('/files/data')
      .query({ fileName: '' })
      .expect(400)
      .expect('Content-Type', /json/)

    expect(response.body).to.deep.equal({
      error: 'fileName is required'
    })
  })

  it('returns a controlled error when the requested file fails to download', async () => {
    nock(baseUrl, {
      reqheaders: {
        authorization: apiKey
      }
    })
      .get('/file/file1.csv')
      .reply(500, { error: 'download failed' })

    const response = await request(app)
      .get('/files/data')
      .query({ fileName: 'file1.csv' })
      .expect(500)
      .expect('Content-Type', /json/)

    expect(response.body).to.deep.equal({
      error: 'Unable to retrieve file content'
    })
  })

  it('returns the external files list from /files/list', async () => {
    const payload = { files: ['file1.csv', 'file2.csv'] }

    nock(baseUrl, {
      reqheaders: {
        authorization: apiKey
      }
    })
      .get('/files')
      .reply(200, payload)

    const response = await request(app)
      .get('/files/list')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).to.deep.equal(payload)
  })

  it('omits files that fail individually and continues', async () => {
    mockFilesList({ files: ['file1.csv', 'file2.csv'] })
    mockFileContent('file1.csv', [
      'file,text,number,hex',
      'file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765'
    ].join('\n'))
    mockFileContent('file2.csv', { error: 'boom' }, 500)

    const response = await request(app)
      .get('/files/data')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).to.deep.equal([
      {
        file: 'file1.csv',
        lines: [
          {
            text: 'RgTya',
            number: 64075909,
            hex: '70ad29aacf0b690b0467fe2b2767f765'
          }
        ]
      }
    ])
    expect(nock.isDone()).to.equal(true)
  })

  it('returns a controlled 500 error when listing files fails', async () => {
    mockFilesList({ error: 'list failed' }, 500)

    const response = await request(app)
      .get('/files/data')
      .expect(500)
      .expect('Content-Type', /json/)

    expect(response.body).to.deep.equal({
      error: 'Unable to retrieve files list'
    })
    expect(nock.isDone()).to.equal(true)
  })
})
