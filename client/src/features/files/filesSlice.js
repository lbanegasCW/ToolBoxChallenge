/**
 * Redux slice for file aggregation state.
 *
 * Responsibilities:
 * - Track the current list of file names.
 * - Track the parsed file data payload.
 * - Track the selected file name used for filtering.
 * - Track loading and error states for async requests.
 * - Expose async thunks for the backend reads used by the screen.
 *
 * State shape:
 * ```js
 * {
 *   files: [],
 *   fileNames: [],
 *   selectedFileName: '',
 *   loading: false,
 *   error: null
 * }
 * ```
 *
 * @module features/files/filesSlice
 */

const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit')
const filesService = require('./filesService')

const initialState = {
  files: [],
  fileNames: [],
  selectedFileName: '',
  loading: false,
  error: null
}

/**
 * Fetches the file names from the backend.
 *
 * This thunk populates the filter options shown by the files screen.
 *
 * @returns {Promise<{files: string[]}>} Files list payload.
 */
const fetchFileNames = createAsyncThunk(
  'files/fetchFileNames',
  async () => filesService.getFileNames()
)

/**
 * Fetches the files data payload.
 *
 * @param {string} [fileName] Optional file name.
 * @returns {Promise<Array>} Parsed files data payload.
 * @throws {Error} Rejects when the backend request fails.
 */
const fetchFilesData = createAsyncThunk(
  'files/fetchFilesData',
  async (fileName) => filesService.getFilesData(fileName)
)

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setSelectedFileName (state, action) {
      state.selectedFileName = action.payload
    },
    clearSelectedFileName (state) {
      state.selectedFileName = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFileNames.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFileNames.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.fileNames = action.payload.files
      })
      .addCase(fetchFileNames.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchFilesData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFilesData.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.files = action.payload
      })
      .addCase(fetchFilesData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

module.exports = filesSlice.reducer
module.exports.fetchFileNames = fetchFileNames
module.exports.fetchFilesData = fetchFilesData
module.exports.setSelectedFileName = filesSlice.actions.setSelectedFileName
module.exports.clearSelectedFileName = filesSlice.actions.clearSelectedFileName
module.exports.initialState = initialState
