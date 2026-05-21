/* global describe it expect */

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
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('sets the selected file name', () => {
    const state = reducer(initialState, setSelectedFileName('test1.csv'))

    expect(state.selectedFileName).toBe('test1.csv')
  })

  it('clears the selected file name', () => {
    const currentState = {
      ...initialState,
      selectedFileName: 'test1.csv'
    }

    const state = reducer(currentState, clearSelectedFileName())

    expect(state.selectedFileName).toBe('')
  })

  it('handles loading, success and error for file names', () => {
    const loadingState = reducer(initialState, {
      type: fetchFileNames.pending.type
    })
    expect(loadingState.loading).toBe(true)
    expect(loadingState.error).toBe(null)

    const successState = reducer(loadingState, {
      type: fetchFileNames.fulfilled.type,
      payload: { files: ['test1.csv'] }
    })
    expect(successState.loading).toBe(false)
    expect(successState.fileNames).toEqual(['test1.csv'])

    const errorState = reducer(successState, {
      type: fetchFileNames.rejected.type,
      error: { message: 'boom' }
    })
    expect(errorState.loading).toBe(false)
    expect(errorState.error).toBe('boom')
  })

  it('handles loading, success and error for files data', () => {
    const loadingState = reducer(initialState, {
      type: fetchFilesData.pending.type
    })
    expect(loadingState.loading).toBe(true)
    expect(loadingState.error).toBe(null)

    const payload = [{ file: 'test1.csv', lines: [] }]
    const successState = reducer(loadingState, {
      type: fetchFilesData.fulfilled.type,
      payload: payload
    })
    expect(successState.loading).toBe(false)
    expect(successState.files).toEqual(payload)

    const errorState = reducer(successState, {
      type: fetchFilesData.rejected.type,
      error: { message: 'boom' }
    })
    expect(errorState.loading).toBe(false)
    expect(errorState.error).toBe('boom')
  })
})
