const request = require('supertest')
const { expect } = require('chai')
const app = require('../src/app')

describe('GET /health', () => {
  it('responds with service status ok', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).to.deep.equal({ status: 'ok' })
  })
})
