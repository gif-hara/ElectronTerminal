const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

let mainWindow;

function createWindow()
{
    mainWindow = new BrowserWindow({width: 800, height: 600});

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "html/index.html"),
        protocol: "file:",
        slashes: false
    }));

    mainWindow.webContents.openDevTools();

    mainWindow.on("close", () => {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () =>
{
    app.quit();
});

app.on("active", () =>
{
    if(mainWindow === null)
    {
        createWindow();
    }
});