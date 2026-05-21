/* global describe it expect */

const React = require('react')
const { render, screen } = require('@testing-library/react')

const FilesTable = require('./FilesTable')

describe('FilesTable', () => {
  it('renders flattened rows', () => {
    render(React.createElement(FilesTable, {
      files: [
        {
          file: 'test1.csv',
          lines: [
            {
              text: 'RgTya',
              number: 64075909,
              hex: '70ad29aacf0b690b0467fe2b2767f765'
            }
          ]
        }
      ]
    }))

    expect(screen.getByText('test1.csv')).toBeInTheDocument()
    expect(screen.getByText('RgTya')).toBeInTheDocument()
    expect(screen.getByText('64075909')).toBeInTheDocument()
  })

  it('renders the empty state when there are no rows', () => {
    render(React.createElement(FilesTable, { files: [] }))

    expect(screen.getByText('No files to display.')).toBeInTheDocument()
  })
})
