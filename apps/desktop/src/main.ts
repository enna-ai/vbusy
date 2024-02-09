import "dotenv/config";
import { app, BrowserWindow } from "electron";

let mainWindow: BrowserWindow | null = null;

const clientURL = process.env.CLIENT_URL || "http://localhost:3000";

function createWindow() {
    mainWindow = new BrowserWindow({
        title: "v busy 🐝",
        width: 1000,
        height: 1000,
        minWidth: 1000,
        minHeight: 1000,
    });

    mainWindow.loadURL(clientURL);
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
