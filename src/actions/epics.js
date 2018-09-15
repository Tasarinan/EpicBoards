import { createAction } from 'redux-actions'

import { toggleDrawer } from './globalUi'

export const createEpicRecord = createAction('CREATE_EPIC_RECORD')
export const deleteEpic = createAction('DELETE_EPIC')
export const setEpics = createAction('SET_EPICS')
export const setSelectedEpic = createAction('SET_SELECTED_EPIC')

export function createEpic() {
  return function(dispatch, getState) {
    const nextId =
      Math.max.apply(
        Math,
        getState().epics.map(o => {
          return o.id
        }),
      ) + 1
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
