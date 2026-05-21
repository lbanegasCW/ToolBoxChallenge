const nock = require('nock')
const request = require('supertest')
const { expect } = require('chai')

const app = require('../src/app')
const { baseUrl, apiKey } = require('../src/config/externalApi.config')

describe('GET /files/data', () => {
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
    const filesList = { files: ['file1.csv', 'file2.csv'] }
    const file1Csv = [
      'file,text,number,hex',
      'file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765'
    ].join('\n')
    const file2Csv = [
      'file,text,number,hex',
      'file2.csv,Another,123456789,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    ].join('\n')

    nock(baseUrl, {
      reqheaders: {
        authorization: apiKey
      }
    })
      .get('/files')
      .reply(200, filesList)

    nock(baseUrl, {
      reqheaders: {
        authorization: apiKey
      }
    })
      .get('/file/file1.csv')
      .reply(200, file1Csv)

    nock(baseUrl, {
      reqheaders: {
        authorization: apiKey
      }
    })
      .get('/file/file2.csv')
      .reply(200, file2Csv)

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
    nock(baseUrl, {
      reqheaders: {
        authorization: apiKey
      }
    })
      .get('/files')
      .reply(200, { files: ['file1.csv', 'file2.csv'] })

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

    nock(baseUrl, {
      reqheaders: {
        authorization: apiKey
      }
    })
      .get('/file/file2.csv')
      .reply(500, { error: 'boom' })

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
  })

  it('returns a controlled 500 error when listing files fails', async () => {
    nock(baseUrl, {
      reqheaders: {
        authorization: apiKey
      }
    })
      .get('/files')
      .reply(500, { error: 'list failed' })

    const response = await request(app)
      .get('/files/data')
      .expect(500)
      .expect('Content-Type', /json/)

    expect(response.body).to.deep.equal({
      error: 'Unable to retrieve files list'
    })
  })
})
