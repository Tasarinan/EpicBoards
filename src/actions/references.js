import { createAction } from 'redux-actions'

export const clearReferences = createAction('CLEAR_REFERENCES')
export const deleteReference = createAction('DELETE_REFERENCE')

export function clearRefenceInputs() {
  return function(dispatch, getState) {
    Promise.all([
      dispatch(setReferenceUrlInput('')),
      dispatch(setReferenceLabelInput('')),
    ])
  }
}

export function submitReference(payload) {
  return function(dispatch, getState) {
    Promise.all([
      dispatch(createReference(payload)),
      dispatch(clearRefenceInputs()),
    ])
  }
}

const createReference = createAction('CREATE_REFERENCE')
