const path = require('path')
// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron')

require('./update')

const autoStart = require('./autoStart')
const isDev = process.env.ELECTRON_ENV == 'development'
// 必须保持tray的引用，否则会被垃圾回收
let tray = null

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'icons/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  // and load the index.html of the app.
  if (isDev) {
    mainWindow.loadURL(
      'http://127.0.0.1:' + (process.env.WEBPACK_PORT | 9005) + '/index.html',
    )
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
    mainWindow.isFocused() ? mainWindow.hide() : mainWindow.show()
  } else {
    mainWindow.show()
  }
}

function createTray() {
  if (!tray) {
    tray = new Tray(path.join(__dirname, 'icons/tray/tray.png'))
  }

  const template = [
    {
      label: '切换窗口',
      click: () => {
        toggleWindow()
      },
    },
    {
      label: '开机启动',
      type: 'checkbox',
      checked: !!autoStart.getOpenAtLogin(),
      click() {
        const openAtLogin = autoStart.getOpenAtLogin()

        if (openAtLogin) {
          autoStart.remove()
        } else {
          autoStart.set()
        }
      }
    },
    {
      label: '退出',
      click: () => {
        app.exit()
      },
    },
  ]

  const contextMenu = Menu.buildFromTemplate(template)
  tray.setContextMenu(contextMenu)
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

  ipcMain.on('getPath', async (event, arg) => {
    event.returnValue = app.getPath(arg)
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
