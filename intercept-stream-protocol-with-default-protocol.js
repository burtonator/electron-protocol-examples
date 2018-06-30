const electron = require('electron');
const app = electron.app;
const protocol = electron.protocol;
const BrowserWindow = electron.BrowserWindow;

/**
 * STATUS: FAILS and Electron just exits.
 *
 * Demonstrates use of the previously registered protocol handler.  I created a
 * bug on the issue and one of the commenters noted that if you return null,
 * the previous/default protocol handler is used.
 *
 * I think this is inaccurate or there is another bug here.
 *
 * It would be AMAZING if this would work as it would dramatically simplify
 * my use case.
 *
 * https://github.com/electron/electron/issues/13512#issuecomment-401509692
 *
 */
function interceptRequest(req, callback) {
    console.log("Request intercepted");
    callback(null);
}

function createMainWindow() {

    let mainWindow = new BrowserWindow();

    let url = "http://httpbin.org/get";
    mainWindow.loadURL(url);

}

app.on('ready', async function() {

    protocol.interceptStreamProtocol('http', interceptRequest, (error) => {

        if (error) {
            console.error('failed to register protocol handler for HTTP');
            return;
        }

        createMainWindow();

    });

});

