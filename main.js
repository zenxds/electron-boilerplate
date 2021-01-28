const path = require('path')
// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray, Menu } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null
let tray = null

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 450,
    height: 680,
    icon: path.join(__dirname, 'icons/icon.png'),
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  if (process.env.ELECTRON_ENV == "development") {
    mainWindow.loadURL('http://127.0.0.1:' + (process.env.WEBPACK_PORT | 9005) + '/index.html')
  } else {
    mainWindow.loadFile('index.html')
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.on('minimize', function() {
    mainWindow.hide()
  })
}

function toggleWindow() {
  if (mainWindow === null) {
    return createWindow()
  }

  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    mainWindow.show()
  }
}

function createTray() {
  tray = new Tray(path.join(__dirname, '../icons/png/32x32.png'))

  tray.on('click', toggleWindow)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  createWindow()
  createTray()

  if (process.platform === 'darwin') {
    app.dock.hide()
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
