import { createAction } from 'redux-actions'

// EPICS
export const createEpicRecord = createAction('CREATE_EPIC_RECORD')
export const deleteEpic = createAction('DELETE_EPIC')
export const setSelectedEpic = createAction('SET_SELECTED_EPIC')

export function createEpic() {
  return function(dispatch, getState) {
    const nextId = Math.max.apply(Math, getState().epics.map((o) => { return o.id })) + 1
    const nextIndex = getState().epics.length

    Promise.all([
      dispatch(createEpicRecord(nextId)),
      dispatch(selectEpic(nextIndex)),
    ])
  }
}

export function selectEpic(payload) {
  return function(dispatch, getState) {
    Promise.all([
      dispatch(setSelectedEpic(payload)),
      dispatch(toggleDrawer(false)),
    ])
  }
}

// GLOBAL UI
export const setReferenceUrlInput = createAction('SET_REFERENCE_URL_INPUT')
export const setReferenceLabelInput = createAction('SET_REFERENCE_LABEL_INPUT')
export const toggleDrawer = createAction('SET_DRAWER')

// EPIC CONTENT
export const setEpicTitle = createAction('SET_EPIC_TITLE')
export const setEpicProblem = createAction('SET_EPIC_PROBLEM')
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
