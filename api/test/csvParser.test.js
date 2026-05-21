/* global describe it */

const { expect } = require('chai')

const { parseCsvContent } = require('../src/utils/csvParser')

describe('csvParser', () => {
  it('parses a valid CSV file', () => {
    const csv = [
      'file,text,number,hex',
      'file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765'
    ].join('\n')

    const result = parseCsvContent('file1.csv', csv)

    expect(result).to.deep.equal({
      file: 'file1.csv',
      lines: [
        {
          text: 'RgTya',
          number: 64075909,
          hex: '70ad29aacf0b690b0467fe2b2767f765'
        }
      ]
    })
  })

  it('ignores incomplete lines', () => {
    const csv = [
      'file,text,number,hex',
      'file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765',
      'file2.csv,RgTya,64075909'
    ].join('\n')

    const result = parseCsvContent('file1.csv', csv)

    expect(result.lines).to.have.lengthOf(1)
  })

  it('ignores lines with extra columns', () => {
    const csv = [
      'file,text,number,hex',
      'file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765,extra'
    ].join('\n')

    const result = parseCsvContent('file1.csv', csv)

    expect(result).to.deep.equal({
      file: 'file1.csv',
      lines: []
    })
  })

  it('ignores lines with invalid numbers', () => {
    const csv = [
      'file,text,number,hex',
      'file1.csv,RgTya,abc,70ad29aacf0b690b0467fe2b2767f765'
    ].join('\n')

    const result = parseCsvContent('file1.csv', csv)

    expect(result).to.deep.equal({
      file: 'file1.csv',
      lines: []
    })
  })

  it('ignores lines with invalid hex values', () => {
    const csv = [
      'file,text,number,hex',
      'file1.csv,RgTya,64075909,not-hex'
    ].join('\n')

    const result = parseCsvContent('file1.csv', csv)

    expect(result).to.deep.equal({
      file: 'file1.csv',
      lines: []
    })
  })

  it('returns an empty lines array for an empty file', () => {
    const result = parseCsvContent('file1.csv', '')

    expect(result).to.deep.equal({
      file: 'file1.csv',
      lines: []
    })
  })

  it('returns an empty lines array for a file with only header', () => {
    const csv = 'file,text,number,hex'

    const result = parseCsvContent('file1.csv', csv)

    expect(result).to.deep.equal({
      file: 'file1.csv',
      lines: []
    })
  })

  it('ignores blank lines interspersed in the content', () => {
    const csv = [
      'file,text,number,hex',
      '',
      'file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765',
      '   ',
      'file2.csv,Another,123456789,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    ].join('\n')

    const result = parseCsvContent('file1.csv', csv)

    expect(result).to.deep.equal({
      file: 'file1.csv',
      lines: [
        {
          text: 'RgTya',
          number: 64075909,
          hex: '70ad29aacf0b690b0467fe2b2767f765'
        },
        {
          text: 'Another',
          number: 123456789,
          hex: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        }
      ]
    })
  })
})
