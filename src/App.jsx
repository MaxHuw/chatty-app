import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Navbar from './Navbar.jsx';


// const URL = 'ws://172.46.1.187:3001'; Playing around with accessing app over local network.
const URL = 'ws://localhost:3001';


class App extends Component {

  constructor(props) {
    super();
    this.state = 
    { 
      totalUsers: 0,
      currentUser: {name: "Anonymous"}, // default to Anonymous
      messages: []
    }

    this.addNewMessage = this.addNewMessage.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.submitNotification = this.submitNotification.bind(this);
    this.updateUserCount = this.updateUserCount.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);

  }

  ws = new WebSocket(URL);

  componentDidMount() {

    this.ws.onopen = () => {
      console.log("Connected to WS Server " + URL)
    }

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data); //Parse incoming data.

      switch(data.type){
        //When type is new message, call addNewMessage to add to 
        //message array in state.
        case "incomingMessage":
          console.log("Message recieved from server.")
          this.addNewMessage(data);
          break;
        case "incomingNotification":
        //Also add notifications to the message array, but with the 
        //different type, they will be rendered as notifications 
        //by the MessageList.jsx
          console.log("Notification recieved from server.")
          this.addNewMessage(data);
          break;
        case "userConnection":
        //When a user has connected or disconnected, server tells all
        //connected users so their user count is updated.
          console.log("Connection status recieved from server")
          this.updateUserCount(data);
          break;
        default:
          throw new Error("Unknown even type: " + data.type);
      }
    }

    
  }

  //Input: notification object from ChatBar.jsx from when user changes name.
  //Output: Stringified object to server.
  submitNotification(newNotification){
    console.log("Sending newUserName to the server.");
    this.ws.send(JSON.stringify(newNotification));
    console.log("Notification of new user name sent.");
  }

  //Input: new message object from ChatBar.jsx from when user sends a message.
  //Output: Stringified object to server.
  submitMessage(newMessageData){
    console.log("Sending message to WS server.");
    this.ws.send(JSON.stringify(newMessageData));
    console.log("Message sent to WS server.")
  }

  //Input: Parsed object from server.
  //Output: Parsed message object added to messages array in state.
  addNewMessage(newMessageData){
    const oldMessageArray = this.state.messages;
    console.log(newMessageData);
    const newMessageArray = [...oldMessageArray, newMessageData];
    this.setState({messages: newMessageArray });
    console.log(this.state.messages);
  }

  //Input: Parsed object from server with new number of online users.
  //Output: Updates totalUsers in state.
  updateUserCount(newStatus){
    this.setState({totalUsers: newStatus.content});
    console.log("Number of acive users: " + this.state.totalUsers);
  }

  //Input: New username from Chatbar input field.
  //Output: Updates currentUser.name in state.
  updateCurrentUser(newUserName){
    console.log("New updated user name: " + newUserName);
    this.setState({currentUser: {name: newUserName }})
  }
  
  render() {
    return (
      <div>
        <Navbar activeUsers={this.state.totalUsers}/>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} updateCurrentUser={this.updateCurrentUser} submitMessage={this.submitMessage} submitNotification={this.submitNotification}/>
      </div>
    );
  }
}

export default App;
