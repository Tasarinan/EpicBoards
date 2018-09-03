import { createAction } from 'redux-actions'

// EPICS
export const createEpic = createAction('CREATE_EPIC')
export const selectEpic = createAction('SET_SELECTED_EPIC')


export const setEpicTitle = createAction('SET_EPIC_TITLE')
export const setProblemContent = createAction('SET_PROBLEM_CONTENT')
export const setPhasesContent = createAction('SET_PHASES_CONTENT')

// GLOBAL UI
export const setUrlInput = createAction('SET_REFERENCE_URL_INPUT')
export const setLabelInput = createAction('SET_REFERENCE_LABEL_INPUT')
export const toggleDrawer = createAction('SET_DRAWER')

// REFERENCES
export const addReference = createAction('ADD_REFERENCE')
export const clearReferences = createAction('CLEAR_REFERENCES')
export const deleteReference = createAction('DELETE_REFERENCE')
export function clearRefenceInputs() {
  return function(dispatch, getState) {
    dispatch(setUrlInput(''))
    dispatch(setLabelInput(''))
  }
}

export function submitReference(payload) {
  return function(dispatch, getState) {
    dispatch(addReference(payload))
    dispatch(clearRefenceInputs())
  }
}
