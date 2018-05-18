/// <reference path="./../../../node_modules/electron/electron.d.ts"/>
var electron = require("electron");
var app = electron.app;
var path = require("path");
var url = require("url");
var ET;
(function (ET) {
    var main = /** @class */ (function () {
        function main(app) {
            this.mainWindow = null;
            app.on("ready", this.createWindow);
            app.on("window-all-closed", this.onWindowAllClosed);
        }
        main.prototype.createWindow = function () {
            var _this = this;
            this.mainWindow = new electron.BrowserWindow({ width: 800, height: 600 });
            this.mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, "./../../html/index.html"),
                protocol: "file:",
                slashes: false
            }));
            this.mainWindow.webContents.openDevTools();
            this.mainWindow.on("close", function () {
                _this.mainWindow = null;
            });
        };
        main.prototype.onWindowAllClosed = function () {
            app.quit();
        };
        main.prototype.onActive = function () {
            if (this.mainWindow === null) {
                this.createWindow();
            }
        };
        return main;
    }());
    ET.main = main;
})(ET || (ET = {}));
var main = new ET.main(app);
