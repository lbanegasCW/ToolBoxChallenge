/**
 * Redux store configuration.
 *
 * Responsibilities:
 * - Create the application store.
 * - Register the feature reducers used by the client.
 * - Provide a single state container for the files workflow.
 *
 * @module store
 */

const { configureStore } = require('@reduxjs/toolkit')
const filesReducer = require('../features/files/filesSlice')

/**
 * Shared Redux store for the client.
 *
 * The store currently manages only the `files` slice, which is enough for the
 * challenge scope at this stage.
 *
 * @type {import('@reduxjs/toolkit').EnhancedStore}
 */
const store = configureStore({
  reducer: {
    files: filesReducer
  }
})

module.exports = {
  store
}
