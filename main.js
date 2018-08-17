const { app , BrowserWindow , ipcMain, Tray , Menu , globalShortcut } = require('electron');
const templateGenerator = require('./template.js');
let configWindow = null;


app.on('ready',() => {

      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
      });

      tray = new Tray(__dirname + '/app/img/logo.png');
      let template = templateGenerator.generatesTrayTemplate(mainWindow);
      let trayMenu = Menu.buildFromTemplate(template);
      tray.setContextMenu(trayMenu);

      // let templateMenuMain = templateGenerator.generatesMenuMainTemplate(app);
      // let menuMain = Menu.buildFromTemplate(templateMenuMain);

      globalShortcut.register('CmdOrCtrl+Shift+Y',() => {

        if (configWindow == null) {
              configWindow = new BrowserWindow({
              width: 300,
              height: 220,
              alwaysOnTop: true,
              frame: false
              // backgroundColor: '#2e2c29',
            });

            configWindow.on('closed' , () => {
                configWindow = null;
            });
        }

         configWindow.loadURL(`file://${__dirname}/app/config.html`);
      });


       mainWindow.setMenu(null);

       mainWindow.maximize();

      mainWindow.loadURL(`file://${__dirname}/app/index.html`);

});

ipcMain.on('fechar-janela-config',() => {
  configWindow.close();
});

app.on('window-all-closed',() => {
  app.quit();
});
