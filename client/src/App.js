/**
 * Root application component.
 *
 * Responsibilities:
 * - Compose the top navbar and the files page layout.
 * - Keep the current frontend focused on the files workflow.
 * - Avoid embedding data access concerns at the app shell level.
 *
 * @module App
 */

const React = require('react')
const AppNavbar = require('./components/AppNavbar')
const FilesPage = require('./features/files/FilesPage')

/**
 * Renders the application shell.
 *
 * The component delegates the feature logic to `FilesPage`.
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
