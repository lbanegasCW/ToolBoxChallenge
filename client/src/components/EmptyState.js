/**
 * Empty state component.
 *
 * Responsibilities:
 * - Inform the user when there are no rows to display.
 * - Keep the table area clear and explicit.
 *
 * @module components/EmptyState
 */

const React = require('react')
const { Alert } = require('react-bootstrap')

/**
 * Renders an empty state message.
 *
 * @param {{message?: string}} props Component props.
 * @returns {JSX.Element} Empty state UI.
 */
function EmptyState (props) {
  return React.createElement(
    Alert,
    { variant: 'light', className: 'border text-center mb-0' },
    props.message || 'No files found.'
  )
}

module.exports = EmptyState
