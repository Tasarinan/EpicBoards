const fs = require('fs')
const { dialog } = require('electron').remote

import { setEpics } from './'

export function saveEpics() {
  return async function(dispatch, getState) {
    dialog.showSaveDialog(
      {
        title: 'Save Epics',
        defaultPath: 'epics.json',
      },
      path => {
        if (!path) return

        const epics = getState().epics
        const serializedEpics = JSON.stringify(epics)
        fs.writeFile(path, serializedEpics, err => {
          if (err) {
            console.error(err)
            return
          }
          console.log('File has been created')
        })
      },
    )
  }
}

export function importEpics() {
  return async function dispatch(dispatch, getState) {
    dialog.showOpenDialog(
      {
        title: 'Select an Epic JSON',
        defaultPath: 'Epics.json',
        filters: [
          {
            name: 'JSON',
            extensions: ['json'],
          },
        ],
        properties: ['openFile'],
      },
      paths => {
        const path = paths[0]
        const epics = fs.readFileSync(path, { encoding: 'utf8'})
        const parsedEpics = JSON.parse(epics)
        dispatch(setEpics(parsedEpics))
      },
    )
  }
}
