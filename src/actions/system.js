const fs = require('fs')
const { dialog } = require('electron').remote

import { createAction } from 'redux-actions'

import {
  setEpics,
  toggleSaving,
  toggleNotification,
  setNotificationContent,
} from './'

export function saveEpics() {
  return async function(dispatch, getState) {
    dispatch(toggleSaving(true))
    const { epics, appSettings } = getState()
    const { saveLocation } = appSettings

    if (!saveLocation) {
      dispatch(setNotificationContent("Please set a save location in your settings"))
      dispatch(toggleNotification(true))
      dispatch(toggleSaving(false))
      return
    }

    const serializedEpics = JSON.stringify(epics)
    fs.writeFile(saveLocation, serializedEpics, err => {
      if (err) {
        console.error(err)
        dispatch(setNotificationContent("There was an error"))
        dispatch(toggleNotification(true))
        dispatch(toggleSaving(false))
        return
      }
      dispatch(setNotificationContent("Saved Epics!"))
      dispatch(toggleNotification(true))
      dispatch(toggleSaving(false))
    })
  }
}

export function importEpics() {
  return async function dispatch(dispatch, getState) {
    const { appSettings } = getState()
    const { saveLocation } = appSettings

    if (!saveLocation) {
      dispatch(setNotificationContent("Please set a save location in your settings"))
      dispatch(toggleNotification(true))
      dispatch(toggleSaving(false))
      return
    }

    const epics = fs.readFileSync(saveLocation, { encoding: 'utf8' })
    const parsedEpics = JSON.parse(epics)
    dispatch(setEpics(parsedEpics))
    dispatch(setNotificationContent("Epics imported successfully"))
    dispatch(toggleNotification(true))
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
