/**
 * Redux store configuration.
 *
 * Responsibilities:
 * - Create the application store.
 * - Register the feature reducers used by the client.
 *
 * @module store
 */

const { configureStore } = require('@reduxjs/toolkit')
const filesReducer = require('../features/files/filesSlice')

/**
 * Shared Redux store for the client.
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
