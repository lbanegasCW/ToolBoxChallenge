/**
 * File name filter control.
 *
 * Responsibilities:
 * - Expose a Bootstrap select populated with the file names returned by the API.
 * - Allow clearing the current selection.
 * - Notify the parent when the selected file changes.
 * - Degrade gracefully when no file names have been loaded yet.
 *
 * @module features/files/FileNameFilter
 */

const React = require('react')
const { Button, Form, InputGroup } = require('react-bootstrap')

/**
 * Renders the file name filter.
 *
 * The first option always represents the unfiltered state.
 *
 * @param {{
 *   fileNames: string[],
 *   selectedFileName: string,
 *   onSelect: function,
 *   onClear: function
 * }} props Component props.
 * @returns {JSX.Element} File name filter UI.
 */
function FileNameFilter (props) {
  const fileNames = Array.isArray(props.fileNames) ? props.fileNames : []
  const hasFileNames = fileNames.length > 0

  return React.createElement(
    Form,
    null,
    React.createElement(
      Form.Group,
      { controlId: 'file-name-filter' },
      React.createElement(
        Form.Label,
        null,
        'File name'
      ),
      React.createElement(
        InputGroup,
        null,
        React.createElement(
          Form.Select,
          {
            value: props.selectedFileName,
            onChange: function onChange (event) {
              props.onSelect(event.target.value)
            },
            disabled: !hasFileNames
          },
          React.createElement(
            'option',
            { value: '' },
            hasFileNames ? 'All files' : 'No files available'
          ),
          fileNames.map(function mapFileName (fileName) {
            return React.createElement(
              'option',
              { key: fileName, value: fileName },
              fileName
            )
          })
        ),
        React.createElement(
          Button,
          {
            variant: 'outline-secondary',
            onClick: props.onClear,
            disabled: !props.selectedFileName
          },
          'Clear'
        )
      )
    )
  )
}

module.exports = FileNameFilter
