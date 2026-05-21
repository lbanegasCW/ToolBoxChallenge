/**
 * Files page.
 *
 * Responsibilities:
 * - Fetch file names and file data on screen load.
 * - Keep the selected file name synchronized with Redux.
 * - Expose the file selector and clear action.
 * - Render loading, error, empty and data states for the files flow.
 * - Orchestrate the feature-level components without embedding table logic.
 *
 * @module features/files/FilesPage
 */

const React = require('react')
const { useDispatch, useSelector } = require('react-redux')
const { Container, Card, Row, Col } = require('react-bootstrap')
const LoadingState = require('../../components/LoadingState')
const ErrorAlert = require('../../components/ErrorAlert')
const FileNameFilter = require('./FileNameFilter')
const FilesTable = require('./FilesTable')
const {
  fetchFileNames,
  fetchFilesData,
  setSelectedFileName,
  clearSelectedFileName
} = require('./filesSlice')

/**
 * Renders the files page.
 *
 * The page performs the initial bootstrap fetches once and then reuses the
 * selected file name to request filtered data.
 *
 * @returns {JSX.Element} Files page UI.
 */
function FilesPage () {
  const dispatch = useDispatch()
  const [initialLoadComplete, setInitialLoadComplete] = React.useState(false)
  const filesState = useSelector(function selectFilesState (state) {
    return state.files
  })
  const fileNames = filesState.fileNames
  const selectedFileName = filesState.selectedFileName
  const loading = filesState.loading
  const error = filesState.error
  const files = filesState.files

  React.useEffect(function loadFilesPage () {
    let active = true

    Promise.allSettled([
      dispatch(fetchFileNames()),
      dispatch(fetchFilesData())
    ]).then(function markInitialLoadComplete () {
      if (active) setInitialLoadComplete(true)
    })

    return function cleanup () {
      active = false
    }
  }, [dispatch])

  function handleSelect (fileName) {
    dispatch(setSelectedFileName(fileName))
    dispatch(fetchFilesData(fileName))
  }

  function handleClear () {
    dispatch(clearSelectedFileName())
    dispatch(fetchFilesData())
  }

  return React.createElement(
    Container,
    { className: 'py-4' },
    !initialLoadComplete || loading
      ? React.createElement(LoadingState)
      : error
        ? React.createElement(ErrorAlert, { message: error })
        : React.createElement(
          Card,
          { className: 'border-0 shadow-sm' },
          React.createElement(
            Card.Body,
            null,
            React.createElement(
              Row,
              { className: 'g-3 mb-4' },
              React.createElement(
                Col,
                { xs: 12, md: 5, lg: 4 },
                React.createElement(FileNameFilter, {
                  fileNames: fileNames,
                  selectedFileName: selectedFileName,
                  onSelect: handleSelect,
                  onClear: handleClear
                })
              )
            ),
            React.createElement(FilesTable, { files: files })
          )
        )
  )
}

module.exports = FilesPage
