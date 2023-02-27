const {
  app,
  BrowserWindow,
  ipcMain,
  Menu
} = require('electron')
const path = require('path');
const mode = process.argv[2];
const context_menu = require("./menu")

const productURL = path.join(__dirname, '../build/index.html');
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

app.whenReady().then(() => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    minWidth: 250,
    minHeight: 250,
    maxWidth: 500,
    maxHeight: 500,
    x: 1500,
    y: 100,
    transparent: true,
    hasShadow: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: true
    }
  })

  mainWindow.setAspectRatio(1)
  Menu.setApplicationMenu(context_menu);
  // and load the index.html of the app.
  if (mode === 'dev') {
    mainWindow.loadURL("http://localhost:8080/");
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(productURL)
  }

  // Open the DevTools.
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})