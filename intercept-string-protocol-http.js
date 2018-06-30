const electron = require('electron');
const app = electron.app;
const protocol = electron.protocol;
const BrowserWindow = electron.BrowserWindow;

/**
 * STATUS: this works perfectly and returns the data we expect.
 *
 * @param request
 * @param callback
 */
function interceptStringProtocol(request, callback) {

    callback({
        mimeType: "text/html",
        data: "<h1>This is a perfectly cromulent response.</h1>"
    });

}

function createMainWindow() {
    let mainWindow = new BrowserWindow();

    let url = "http://httpbin.org/get";
    mainWindow.loadURL(url);
    return mainWindow;

}

app.on('ready', async function() {

    protocol.interceptStringProtocol('http', interceptStringProtocol, (error) => {

        if (error) {
            console.error('failed to register protocol handler for HTTP');
            return;
        }

        let mainWindow = createMainWindow();

    });

});

