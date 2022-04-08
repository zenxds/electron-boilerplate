const { execSync } = require('child_process')
const { app } = require('electron')
// const log = require('electron-log')

const SOFTWARE_NAME = 'NProxy'
const isWin = process.platform === 'win32'
const execPath = process.execPath
const regPath = process.arch.includes('64') ? 'HKEY_LOCAL_MACHINE\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Run' : 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run'

exports.set = function() {
  if (isWin) {
    execSync(`REG ADD ${regPath} /v ${SOFTWARE_NAME} /t REG_SZ /d "${execPath} --openAsHidden" /f`)
    return
  }

  app.setLoginItemSettings({
    openAtLogin: true,
    openAsHidden: true,
  })
}

exports.remove = function() {
  if (isWin) {
    execSync(`REG DELETE ${regPath} /v ${SOFTWARE_NAME} /f`)
    return
  }

  app.setLoginItemSettings({
    openAtLogin: false,
    openAsHidden: false,
  })
}

exports.getOpenAtLogin = function() {
  if (isWin) {
    try {
      return execSync(`REG QUERY ${regPath} /v ${SOFTWARE_NAME}`)
    } catch(err) {
      return false
    }
  }

  return app.getLoginItemSettings().openAtLogin
}

exports.getOpenAsHidden = function() {
  if (isWin) {
    return process.argv.includes('--openAsHidden')
  }

  return app.getLoginItemSettings().wasOpenedAsHidden
}
