/* eslint-disable @typescript-eslint/no-var-requires */
const { Tray } = require('electron');
const { resolve } = require('path');

console.log("diretorio",__dirname);

const iconPath = resolve(__dirname, '../', '../src/assets/img', '20.png');

function createTray() {
    const tray = new Tray('/src/assets/img/20.png');
    tray.setToolTip('Pronutrir Atendimento');
    return tray;
}

export default createTray;