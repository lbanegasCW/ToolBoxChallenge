/**
 * Loading state component.
 *
 * Responsibilities:
 * - Show a centered spinner while data is being fetched.
 * - Keep the loading UI simple and consistent across the app.
 * - Avoid leaking request details into the visual layer.
 *
 * @module components/LoadingState
 */

const React = require('react')
const { Spinner } = require('react-bootstrap')

/**
 * Renders the loading indicator.
 *
 * This is used while the files screen is fetching initial or filtered data.
 *
 * @returns {JSX.Element} Loading UI.
 */
function LoadingState () {
  return React.createElement(
    'div',
    { className: 'd-flex justify-content-center align-items-center py-5' },
    React.createElement(Spinner, {
      animation: 'border',
      role: 'status',
      variant: 'danger'
    })
  )
}

module.exports = LoadingState
