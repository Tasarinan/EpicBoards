import { createAction } from 'redux-actions'

export function clearRefenceInputs() {
  return function (dispatch, getState) {
    dispatch(setUrlInput(''))
    dispatch(setLabelInput(''))
  }
}

export function submitReference(payload) {
  return function (dispatch, getState) {
    dispatch(addReference(payload))
    dispatch(clearRefenceInputs())
  }
}

export const addReference = createAction('ADD_REFERENCE')
export const setUrlInput = createAction('SET_URL_INPUT')
export const setLabelInput = createAction('SET_LABEL_INPUT')
export const clearReferences = createAction('CLEAR_REFERENCES')
export const deleteReference = createAction('DELETE_REFERENCE')
