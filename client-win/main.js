const { nativeImage, Tray, Menu, net } = require('electron');
const path = require('path');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var mainWindow = null;
var tray = null;
var contextMenu = null;

initChromuim();

app.on('ready', function () {
    createMainWindow();
    initTrayMenu();
});


function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        transparent: true,
        frame: false,
        resizable: false,
        alwaysOnTop: true,
        center: true,
        skipTaskbar: true,
        autoHideMenuBar: true,
        focusable: false
    });

    mainWindow.setAlwaysOnTop(true, 'normal', 100);
    mainWindow.isAlwaysOnTop()
    mainWindow.maximize();
    mainWindow.setIgnoreMouseEvents(true);
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
}
function initChromuim() {
    app.commandLine.appendSwitch('enable-gpu-rasterization', true);
    app.commandLine.appendSwitch('enable-native-gpu-memory-buffers', true);
    app.commandLine.appendSwitch('high-dpi-support', true);
    app.commandLine.appendSwitch('device-scale-factor', true);
    app.commandLine.appendSwitch('disable-touch-adjustment', true);
    app.commandLine.appendSwitch('main-frame-resizes-are-orientation-changes', true);
    app.commandLine.appendSwitch('disable-pinch', true);
}

function showMainWindow() {
    if (mainWindow) {
        mainWindow.show()
    }
}
function hideMainWindow() {
    mainWindow.hide();
}

function handleToggleShowMainWindow() {
    if (mainWindow && mainWindow.isVisible()) {
        hideMainWindow();
    } else {
        showMainWindow();
    }
}


function initTrayMenu() {
    try {
        let iconPath = path.join(__dirname, "ico/favicon.png");
        console.log(iconPath);
        const nimage = nativeImage.createFromPath(iconPath);

        tray = new Tray(nimage);
        tray.setToolTip('teacher cui');
        contextMenu = Menu.buildFromTemplate([
            {
                label: '显示',
                type: 'normal',
                click: showMainWindow
            },
            {
                label: '隐藏',
                type: 'normal',
                click: hideMainWindow
            },
            {
                label: '退出',
                type: 'normal',
                click: function () {
                    app.quit();
                }
            }

        ]);

        tray.setContextMenu(contextMenu);
        tray.on('click', handleToggleShowMainWindow);
    } catch (error) {
        console.log(error);
    }
}
