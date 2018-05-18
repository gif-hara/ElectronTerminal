/// <reference path="./../../../node_modules/electron/electron.d.ts"/>
const electron = require("electron");
const app = electron.app;
const path = require("path");
const url = require("url");

namespace ET
{
    export class main
    {
        mainWindow: Electron.BrowserWindow = null;

        constructor(app: Electron.App)
        {
            app.on("ready", this.createWindow);

            app.on("window-all-closed", this.onWindowAllClosed);
        }

        private createWindow(): void
        {
            this.mainWindow = new electron.BrowserWindow({width: 800, height: 600});

            this.mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, "./../../html/index.html"),
                protocol: "file:",
                slashes: false
            }));
        
            this.mainWindow.webContents.openDevTools();
        
            this.mainWindow.on("close", () => {
                this.mainWindow = null;
            });
        }

        private onWindowAllClosed(): void
        {
            app.quit();
        }

        private onActive(): void
        {
            if(this.mainWindow === null)
            {
                this.createWindow();
            }
        }
    }
}

const main = new ET.main(app);