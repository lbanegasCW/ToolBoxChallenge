/* global describe it jest */

const React = require('react')
const { render, screen } = require('@testing-library/react')

jest.mock('./features/files/FilesPage', function mockFilesPage () {
  const ReactMock = require('react')

  return function FilesPageMock () {
    return ReactMock.createElement('div', null, 'FilesPage Mock')
  }
})

const App = require('./App')

describe('App', () => {
  it('renders the top app title', () => {
    render(React.createElement(App))

    expect(screen.getByText('React Test App')).toBeInTheDocument()
  })
})
