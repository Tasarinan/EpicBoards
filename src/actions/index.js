import { createAction } from 'redux-actions'

// EPICS
export const createEpic = createAction('CREATE_EPIC')
export const selectEpic = createAction('SET_SELECTED_EPIC')

// GLOBAL UI
export const setReferenceUrlInput = createAction('SET_REFERENCE_URL_INPUT')
export const setReferenceLabelInput = createAction('SET_REFERENCE_LABEL_INPUT')
export const toggleDrawer = createAction('SET_DRAWER')

// EPIC CONTENT
export const setEpicTitle = createAction('SET_EPIC_TITLE')
export const setProblemContent = createAction('SET_PROBLEM_CONTENT')
export const setPhasesContent = createAction('SET_PHASES_CONTENT')

// REFERENCES
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
