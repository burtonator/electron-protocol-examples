const electron = require('electron');
const app = electron.app;
const protocol = electron.protocol;
const BrowserWindow = electron.BrowserWindow;
const {PassThrough} = require('stream')


/**
 * STATUS: Fails.  This uses the examples provided in the documentation to create
 * a string stream.  Note that if I call .pipe(process.stdout) the stream works
 * perfectly.
 *
 * @param request
 * @param callback
 */
function handleStreamProtocol(request, callback) {

    callback({
        statusCode: 200,
        headers: {
            'content-type': 'text/html'
        },
        data: createStream('<h1>This is a perfectly cromulent response.</h1>')
    })

}

function createStream (text) {
    const rv = new PassThrough();
    rv.push(text);
    rv.push(null);
    return rv;
}


function createMainWindow() {
    let mainWindow = new BrowserWindow();

    let url = "fake:";
    mainWindow.loadURL(url);
    return mainWindow;

}

app.on('ready', async function() {

    console.log("Registering protocol...");

    protocol.registerStreamProtocol('fake', handleStreamProtocol, (err) => {

        if (err) {
            console.error('failed to register protocol handler for HTTP');
            return;
        }

        console.log("Making sure it's handled.. (even with callback)");

        protocol.isProtocolHandled('fake', (schemeExists) => {

            if(schemeExists) {
                createMainWindow();
            } else {
                console.log("We failed: ", schemeExists)
            }

        });

    });

    // protocol.interceptStreamProtocol('https', interceptCallback, (error) => {
    //     if (error) console.error('failed to register protocol handler for HTTPS');
    // });


});

