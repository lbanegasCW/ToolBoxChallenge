/**
 * Files table component.
 *
 * Responsibilities:
 * - Flatten the API response structure into row data.
 * - Render the challenge columns in a Bootstrap table.
 * - Display an empty state when there are no rows to show.
 *
 * @module features/files/FilesTable
 */

const React = require('react')
const { Table } = require('react-bootstrap')
const EmptyState = require('../../components/EmptyState')

function flattenFilesData (files) {
  return files.reduce(function reduceFiles (rows, fileItem) {
    const lines = Array.isArray(fileItem.lines) ? fileItem.lines : []

    lines.forEach(function appendLine (line) {
      rows.push({
        file: fileItem.file,
        text: line.text,
        number: line.number,
        hex: line.hex
      })
    })

    return rows
  }, [])
}

/**
 * Renders the results table.
 *
 * @param {{files: Array}} props Component props.
 * @returns {JSX.Element} Table or empty state.
 */
function FilesTable (props) {
  const rows = flattenFilesData(props.files || [])

  if (rows.length === 0) {
    return React.createElement(EmptyState, { message: 'No files to display.' })
  }

  return React.createElement(
    Table,
    { striped: true, bordered: true, hover: true, responsive: true, className: 'mb-0' },
    React.createElement(
      'thead',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement('th', null, 'File Name'),
        React.createElement('th', null, 'Text'),
        React.createElement('th', null, 'Number'),
        React.createElement('th', null, 'Hex')
      )
    ),
    React.createElement(
      'tbody',
      null,
      rows.map(function mapRow (row, index) {
        return React.createElement(
          'tr',
          { key: `${row.file}-${index}` },
          React.createElement('td', null, row.file),
          React.createElement('td', null, row.text),
          React.createElement('td', null, row.number),
          React.createElement('td', null, row.hex)
        )
      })
    )
  )
}

module.exports = FilesTable
