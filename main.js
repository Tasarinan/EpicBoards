require('electron-reload')(__dirname)

const path = require('path')
const { app, BrowserWindow } = require('electron')
const electron = require('electron')
const Store = require('electron-store')

let win

function createWindow() {
  win = new BrowserWindow({ width: 1440, height: 900 })
  win.loadFile('index.html')

  win.on('resize', () => {
    let { width, height } = win.getBounds()
    store.set('windowBounds', { width, height })
  })

  win.on('closed', () => {
    win = null
  })
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
