/**
 * Error alert component.
 *
 * Responsibilities:
 * - Display request errors in a visible bootstrap alert.
 * - Keep the message readable without exposing technical details.
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
 */
function ErrorAlert (props) {
  return React.createElement(
    Alert,
    { variant: 'danger' },
    props.message || 'Something went wrong.'
  )
}

module.exports = ErrorAlert
