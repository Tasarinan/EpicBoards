require('electron-reload')(__dirname)

const path = require('path')
const { app, BrowserWindow } = require('electron')
const electron = require('electron')
const { ipcMain } = require('electron')
const Store = require('electron-store')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 1440,
    height: 900,
    show: false,
  })

  win.loadFile('index.html')

  win.once('ready-to-show', () => {
    win.show()
    win.focus()
  })

  win.on('closed', () => {
    win = null
  })

  win.saveEpics = () => {
    win.webContents.send('save-epics')
  }

  require('./menu.js')


}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
