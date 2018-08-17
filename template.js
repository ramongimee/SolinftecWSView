const data = require('./data');
const { ipcMain } = require('electron');

module.exports = {

  generatesTrayTemplate(win){
    let template = [
        {
          label: 'Fechar',
          click: () => {
            win.send('window-closed-all');
          }
        }
      ];

    return template;
  },
  generatesMenuMainTemplate(app){
    let templateMenu = [
      {
        label : 'View',
        submenu:[
          {
            role: 'minimize',
            accelerator:'Alt+M'
          }
        ]
      }
    ];

    if(process.platform == 'darwin'){
        templateMenu.unshift({
          label: app.getName(),
          submenu: [
            {
              role: 'close'
            }
          ]
        });
    }

    return templateMenu;
  }
}
