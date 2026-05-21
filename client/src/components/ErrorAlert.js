/**
 * Error alert component.
 *
 * Responsibilities:
 * - Display request errors in a visible bootstrap alert.
 * - Keep the message readable without exposing technical details.
 * - Stay presentation-only and receive error text from the screen layer.
 *
 * @module components/ErrorAlert
 */

const React = require('react')
const { Alert } = require('react-bootstrap')

/**
 * Renders an error alert.
 *
 * @param {{message: string}} props Component props.
 * @returns {JSX.Element} Error alert.
 * @throws {Error} Does not throw on its own; rendering failures would be React/runtime issues.
 */
function ErrorAlert (props) {
  return React.createElement(
    Alert,
    { variant: 'danger' },
    props.message || 'Something went wrong.'
  )
}

module.exports = ErrorAlert
