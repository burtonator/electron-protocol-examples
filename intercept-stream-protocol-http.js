const electron = require('electron');
const app = electron.app;
const protocol = electron.protocol;
const BrowserWindow = electron.BrowserWindow;
const {PassThrough} = require('stream')

/**
 * STATUS: fails.
 *
 * @param request
 * @param callback
 */
function interceptStreamProtocol(request, callback) {

    // The usage is similar to the other register{Any}Protocol, except that the

    // callback should be called with either a Readable object or an object that
    // has the data, statusCode, and headers properties.

    setTimeout(() => {

        callback({
            statusCode: 200,
            headers: {
                'content-type': 'text/html'
            },
            data: createStream('HTTP 200 OK\r\n<h5>Response</h5>')
        });

    }, 0);

}

function createStream (text) {
    const rv = new PassThrough();
    rv.push(text);
    rv.push(null);
    return rv;
}

function createMainWindow() {

    let mainWindow = new BrowserWindow();

    let url = "http://example.com";
    mainWindow.loadURL(url);
    return mainWindow;

}

app.on('ready', async function() {

    protocol.interceptStreamProtocol('http', interceptStreamProtocol, (error) => {

        if (error) {
            console.error('failed to register protocol handler for HTTP');
            return;
        }

        console.log("we're registered now.");

        let mainWindow = createMainWindow();

    });


});

