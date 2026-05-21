/**
 * Root application component.
 *
 * Responsibilities:
 * - Compose the top navbar and the files page layout.
 * - Keep the current frontend as a simple static shell for the challenge.
 *
 * @module App
 */

const React = require('react')
const AppNavbar = require('./components/AppNavbar')
const FilesPage = require('./features/files/FilesPage')

/**
 * Renders the application shell.
 *
 * @returns {JSX.Element} Root app UI.
 */
function App () {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(AppNavbar),
    React.createElement(FilesPage)
  )
}

module.exports = App
