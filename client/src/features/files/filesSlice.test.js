/* global describe it */

const { expect } = require('chai')
const reducer = require('./filesSlice')
const {
  initialState,
  setSelectedFileName,
  clearSelectedFileName,
  fetchFileNames,
  fetchFilesData
} = require('./filesSlice')

describe('filesSlice', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).to.deep.equal(initialState)
  })

  it('sets the selected file name', () => {
    const state = reducer(initialState, setSelectedFileName('test1.csv'))

    expect(state.selectedFileName).to.equal('test1.csv')
  })

  it('clears the selected file name', () => {
    const currentState = {
      ...initialState,
      selectedFileName: 'test1.csv'
    }

    const state = reducer(currentState, clearSelectedFileName())

    expect(state.selectedFileName).to.equal('')
  })

  it('handles loading, success and error for file names', () => {
    const loadingState = reducer(initialState, {
      type: fetchFileNames.pending.type
    })
    expect(loadingState.loading).to.equal(true)
    expect(loadingState.error).to.equal(null)

    const successState = reducer(
      loadingState,
      {
        type: fetchFileNames.fulfilled.type,
        payload: { files: ['test1.csv'] }
      }
    )
    expect(successState.loading).to.equal(false)
    expect(successState.fileNames).to.deep.equal(['test1.csv'])

    const errorState = reducer(successState, {
      type: fetchFileNames.rejected.type,
      error: { message: 'boom' }
    })
    expect(errorState.loading).to.equal(false)
    expect(errorState.error).to.equal('boom')
  })

  it('handles loading, success and error for files data', () => {
    const loadingState = reducer(initialState, {
      type: fetchFilesData.pending.type
    })
    expect(loadingState.loading).to.equal(true)
    expect(loadingState.error).to.equal(null)

    const payload = [{ file: 'test1.csv', lines: [] }]
    const successState = reducer(loadingState, {
      type: fetchFilesData.fulfilled.type,
      payload: payload
    })
    expect(successState.loading).to.equal(false)
    expect(successState.files).to.deep.equal(payload)

    const errorState = reducer(successState, {
      type: fetchFilesData.rejected.type,
      error: { message: 'boom' }
    })
    expect(errorState.loading).to.equal(false)
    expect(errorState.error).to.equal('boom')
  })
})
