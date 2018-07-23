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
function interceptBufferProtocol(request, callback) {

    callback({
        mimeType: "text/html",
        data: Buffer.from("<h1>This is a perfectly cromulent response.</h1>", 'utf8')
    });

}

function createMainWindow() {
    let mainWindow = new BrowserWindow();

    let url = "http://httpbin.org/get";
    mainWindow.loadURL(url);
    return mainWindow;

}

app.on('ready', async function() {

    protocol.interceptBufferProtocol('http', interceptBufferProtocol, (error) => {

        if (error) {
            console.error('failed to register protocol handler for HTTP');
            return;
        }

        let mainWindow = createMainWindow();

    });

});

