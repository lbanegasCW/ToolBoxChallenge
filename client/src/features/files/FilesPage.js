/**
 * Files page shell.
 *
 * Responsibilities:
 * - Reserve the page layout for a future filter and table.
 * - Mirror the challenge wireframe without connecting real data yet.
 *
 * @module features/files/FilesPage
 */

const React = require('react')
const { Container, Row, Col, Card, Form, Table } = require('react-bootstrap')

/**
 * Renders the placeholder files page.
 *
 * @returns {JSX.Element} Files page shell.
 */
function FilesPage () {
  return React.createElement(
    Container,
    { className: 'py-4' },
    React.createElement(
      Card,
      { className: 'border-0 shadow-sm' },
      React.createElement(
        Card.Body,
        null,
        React.createElement(
          Row,
          { className: 'mb-3' },
          React.createElement(
            Col,
            { xs: 12, md: 4 },
            React.createElement(
              Form.Group,
              null,
              React.createElement(Form.Label, null, 'Filter'),
              React.createElement(Form.Control, {
                type: 'text',
                placeholder: 'Filter by file name'
              })
            )
          )
        ),
        React.createElement(
          Table,
          { striped: true, bordered: true, hover: true, responsive: true },
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement('th', null, 'File name'),
              React.createElement('th', null, 'Text'),
              React.createElement('th', null, 'Number'),
              React.createElement('th', null, 'Hex')
            )
          ),
          React.createElement(
            'tbody',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                { colSpan: 4, className: 'text-center text-muted py-4' },
                'Table placeholder'
              )
            )
          )
        )
      )
    )
  )
}

module.exports = FilesPage
