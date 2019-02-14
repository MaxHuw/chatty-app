// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

const PORT = 3001;

//Keep track of the total number of users that are currently connected.
let userCount = 0;

const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

//Update the userCount based on if a client has connected or disconnected.
function updateUserCount(moreOrLess){
  if (moreOrLess === "more"){
    userCount ++;
  } else {
    userCount --;
  }
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  
  console.log('Client connected');
  updateUserCount("more");
  
  //Send a connnectionNotice back to the connected users giving them an
  //updated online user count.
  let connectionNotice = {
    type: "userConnection",
    content: userCount
  };

  connectionNotice = JSON.stringify(connectionNotice);
  
  wss.clients.forEach(client => {
    client.send(connectionNotice);
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    
    console.log('Client disconnected')
    updateUserCount("less");
  
    //Send a connnectionNotice back to the connected users giving them an
    //updated online user count.
    let connectionNotice = {
      type: "userConnection",
      content: userCount
    };

    connectionNotice = JSON.stringify(connectionNotice);

    wss.clients.forEach(client => {
      client.send(connectionNotice);
    })
  

  });

  ws.on('message', function incoming(data){
    console.log(data);
    data = JSON.parse(data);

    switch(data.type){ //check to see if data is a new message or a notification.

      //Logic for when a client sends a new message.
      //Sends the new message to all connected clients.
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

      //Logic for when a user changes their username.
      //Sends a notification back to all connected users.
      case "postNotification":
        data.id = uuidv1();
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


