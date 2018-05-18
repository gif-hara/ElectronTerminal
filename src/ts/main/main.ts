/// <reference path="./../../../node_modules/electron/electron.d.ts"/>
const electron = require("electron");

namespace ET
{
    export class main
    {
        app: Electron.App = null;

        mainWindow: Electron.BrowserWindow = null;

        constructor(app: Electron.App)
        {
            this.app = app;

            this.app.on("ready", this.createWindow);
            this.app.on("window-all-closed", this.onWindowAllClosed);
        }

        private createWindow(): void
        {
            var client = require("electron-connect").client;
            const path = require("path");
            const url = require("url");
            
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

            client.create(this.mainWindow);
        }

        private onWindowAllClosed(): void
        {
            if(process.platform != "darwin")
            {
                this.app.quit();
            }
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

const main = new ET.main(electron.app);