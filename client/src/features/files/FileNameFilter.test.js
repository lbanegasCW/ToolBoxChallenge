/* global describe it */

const React = require('react')
const { render, screen } = require('@testing-library/react')

const FileNameFilter = require('./FileNameFilter')

describe('FileNameFilter', () => {
  it('renders file names and clear action', () => {
    render(React.createElement(FileNameFilter, {
      fileNames: ['test1.csv', 'test2.csv'],
      selectedFileName: 'test1.csv',
      onSelect: function onSelect () {},
      onClear: function onClear () {}
    }))

    expect(screen.getByLabelText('File name')).toBeInTheDocument()
    expect(screen.getByText('test1.csv')).toBeInTheDocument()
    expect(screen.getByText('test2.csv')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })
})
