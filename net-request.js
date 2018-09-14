
const electron = require('electron');
const app = electron.app;
const net = electron.net;
const protocol = electron.protocol;
const BrowserWindow = electron.BrowserWindow;

app.on('ready', async function() {

    const options = {
        method: "GET",
        url: 'https://www.cnn.com',
    };

    const netRequest = net.request(options)
      .on('response', async (response) => {

          console.log("response headers: ", response.headers);

          response.on('data', chunk => {
              console.log("GOT CHUNK:", chunk);
          });

          response.on('end', () => {
              console.log("GOT END");
          });

      })
      .on('abort', () => {
          log.error(`Request aborted: ${options.url}`);
      })
      .on('error', (error) => {
          log.error(`Request error: ${options.url}`, error);
      });


    // TODO: we have to call netRequest.write on all the request.uploadData.
    // not urgent because this isn't really a use case we must support.

    netRequest.end();


});

