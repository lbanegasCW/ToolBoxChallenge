const React = require('react')
const { render, screen } = require('@testing-library/react')

const App = require('./App')

describe('App', () => {
  it('renders the top app title', () => {
    render(React.createElement(App))

    expect(screen.getByText('React Test App')).toBeInTheDocument()
  })
})
