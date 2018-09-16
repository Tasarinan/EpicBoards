import { createAction } from 'redux-actions'

import { setReferenceUrlInput, setReferenceLabelInput } from './'

export const clearReferences = createAction('CLEAR_REFERENCES')
export const deleteReference = createAction('DELETE_REFERENCE')

export function submitReference(payload) {
  return function(dispatch, getState) {
    dispatch(createReference(payload))
    dispatch(setReferenceUrlInput(''))
    dispatch(setReferenceLabelInput(''))
  }
}

const createReference = createAction('CREATE_REFERENCE')
