import { app, BrowserWindow, protocol } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
      },
    });

    // Handle routing and serve index.html for all routes
    win.webContents.on('will-navigate', (event) => {
        event.preventDefault();  // Prevent Electron from trying to navigate to a different file
        win.loadFile(path.join(__dirname, 'dist/index.html'));  // Always load index.html
      });
    
    win.webContents.on('new-window', (event) => {
        event.preventDefault();  // Prevent new windows from opening
        win.loadFile(path.join(__dirname, 'dist/index.html'));
    });

    win.loadFile(path.join(__dirname, 'dist/index.html'));

    // Open DevTools for debugging
    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});
  
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
});