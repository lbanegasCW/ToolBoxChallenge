/**
 * Top application navbar.
 *
 * Responsibilities:
 * - Render the red header bar required by the challenge wireframe.
 * - Keep the title visible across the app.
 *
 * @module components/AppNavbar
 */

const React = require('react')
const { Navbar, Container } = require('react-bootstrap')

/**
 * Renders the top navbar.
 *
 * @returns {JSX.Element} Navbar element.
 */
function AppNavbar () {
  return React.createElement(
    Navbar,
    { bg: 'danger', variant: 'dark', className: 'shadow-sm' },
    React.createElement(
      Container,
      null,
      React.createElement(Navbar.Brand, null, 'React Test App')
    )
  )
}

module.exports = AppNavbar
