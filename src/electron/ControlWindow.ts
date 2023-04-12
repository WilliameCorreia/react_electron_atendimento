/* eslint-disable @typescript-eslint/no-var-requires */
import { BrowserWindow, screen, Tray } from 'electron';

function ControlWindow(win: BrowserWindow, tray: Tray) {
    function toggle() {
        if(win.isVisible()){
            win.hide();
        }else{
            //win.show();
            show();
        }
    }

    function show() {
        // pega o posicionamento da win / tray
        const { x, y } = process.platform === 'darwin' ? getPositionMac() : getPositionWindows();
        // atualiza o posionamento da win
        win.setPosition(x, y, false);
        // mostra a win
        win.show();
        win.focus();
    }

    function getPositionMac() {
        const winBounds = win.getBounds();
        const trayBounds = tray.getBounds();

        const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (winBounds.width / 2));
        const y = Math.round(trayBounds.y + trayBounds.height + 3);

        return { x, y }
    }

    function getPositionWindows() {
        const winBounds = win.getBounds();
        /* const trayBounds = tray.getBounds(); */

        // Create a window that fills the screen's available work area.
        const primaryDisplay = screen.getPrimaryDisplay()
        const { width, height } = primaryDisplay.workAreaSize;

        const x = Math.round((width - 5) - winBounds.width);
        const y = Math.round((height - 5) - winBounds.height);

        return { x, y }
    }

    return {toggle}

}

export default ControlWindow;