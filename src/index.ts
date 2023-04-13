import { app } from 'electron';
import CreateWindows from './electron/CreateWindows';
import Tray from './electron/Tray';
import ControlWindow from './electron/ControlWindow';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const App = (): void => {
  const win = CreateWindows();
  const tray = Tray();

  const { toggle } = ControlWindow(win, tray);

  tray.on('click', toggle);
};

app.whenReady().then(() => {
  App();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/* app.on('browser-window-created', () => {
  if (process.platform !== 'darwin')  app.dock.hide();
}) */
