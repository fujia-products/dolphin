const path = require('path');

if (process.platform !== 'win32') module.exports = {};
else
  module.exports = {
    perMachine: false,
    oneClick: false, // disable one-click installation
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
    include: path.join(process.cwd(), 'script/common/installer.nsh'),
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'Collie',
    installerIcon: '../resource/unrelease/icon.ico',
    uninstallerIcon: '../resource/unrelease/icon.ico',
    installerHeader: '../resource/unrelease/icon.ico',
    installerHeaderIcon: '../resource/unrelease/icon.ico',
  };
