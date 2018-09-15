const fs = require('fs')
const { dialog } = require('electron').remote

import { createAction } from 'redux-actions'

import { setEpics } from './'

export function saveEpics() {
  return async function(dispatch, getState) {
    const { epics, appSettings } = getState()
    const { saveLocation } = appSettings
    if (!saveLocation) return 'AN ERROR'

    const serializedEpics = JSON.stringify(epics)
    fs.writeFile(path, serializedEpics, err => {
      if (err) {
        console.error(err)
        return
      }
      console.log('Epics have been saved')
    })
  }
}

export function importEpics() {
  return async function dispatch(dispatch, getState) {
    const { appSettings } = getState()
    const { saveLocation } = appSettings
    if (!saveLocation) return 'AN ERROR'

    const epics = fs.readFileSync(saveLocation, { encoding: 'utf8' })
    const parsedEpics = JSON.parse(epics)
    dispatch(setEpics(parsedEpics))
  }
}

export function startSaveLocationFlow() {
  return async function dispatch(dispatch, getState) {
    dialog.showSaveDialog(
      {
        title: 'Set Location',
        defaultPath: 'epics.json',
      },
      path => {
        dispatch(setSaveLocation(path))
      },
    )
  }
}

export const setSaveLocation = createAction('SET_SAVE_LOCATION')
