// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));

  ws.on('message', function incoming(data){
    console.log(data);
    data = JSON.parse(data);

    switch(data.type){
      case "postMessage":
        data.id = uuidv1();
        data.type = "incomingMessage";
        data = JSON.stringify(data);
        console.log(data);
    
        wss.clients.forEach(client => {
          client.send(data);
          console.log("Message sent to clients.");
        })
        break;

      case "postNotification":
        data.type = "incomingNotification";
        data = JSON.stringify(data);
        console.log(data);

        wss.clients.forEach(client => {
          client.send(data);
          console.log("Notification sent to clients.");
        })
        break;
    };

  })
});


