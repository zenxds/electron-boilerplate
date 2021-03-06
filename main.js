const path = require('path')
// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray } = require('electron')

require('./update')

// 必须保持tray的引用，否则会被垃圾回收
let tray = null

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 580,
    height: 500,
    icon: path.join(__dirname, 'icons/icon.png'),
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  if (process.env.ELECTRON_ENV == "development") {
    mainWindow.loadURL('http://0.0.0.0:' + (process.env.WEBPACK_PORT | 9005) + '/index.html')
  } else {
    mainWindow.loadFile('index.html')
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

function toggleWindow() {
  const mainWindow = BrowserWindow.getAllWindows()[0]
  if (!mainWindow) {
    return
  }

  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    mainWindow.show()
  }
}

function createTray() {
  tray = new Tray(path.join(__dirname, 'icons/png/16x16.png'))

  tray.on('click', toggleWindow)
}

app.whenReady().then(() => {
  createWindow()
  createTray()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    } else {
      toggleWindow()
    }
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
