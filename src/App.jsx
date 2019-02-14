import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

// const URL = 'ws://172.46.1.187:3001'; Playing around with accessing app over local network.
const URL = 'ws://localhost:3001';


class App extends Component {

  constructor(props) {
    super();
    this.state = 
    { 
      totalUsers: 0,
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }

    this.addNewMessage = this.addNewMessage.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.submitNotification = this.submitNotification.bind(this);
    this.updateUserCount = this.updateUserCount.bind(this);

  }

  ws = new WebSocket(URL);

  componentDidMount() {

    this.ws.onopen = () => {
      console.log("Connected to WS Server " + URL)
    }

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch(data.type){
        case "incomingMessage":
          console.log("Message recieved from server.")
          this.addNewMessage(data);
          break;
        case "incomingNotification":
          console.log("Notification recieved from server.")
          this.addNewMessage(data);
          break;
        case "userConnection":
          console.log("Connection status recieved from server")
          this.addNewMessage(data);
          break;
        default:
          throw new Error("Unknown even type: " + data.type);
      }
    }

    
  }

  submitNotification(newNotification){
    console.log("Sending newUserName to the server.");
    this.ws.send(JSON.stringify(newNotification));
    console.log("Notification of new user name sent.");
  }

  submitMessage(newMessageData){
    console.log("Sending message to WS server.");
    this.ws.send(JSON.stringify(newMessageData));
    console.log("Message sent to WS server.")
  }

  addNewMessage(newMessageData){
    const oldMessageArray = this.state.messages;
    console.log(newMessageData);
    const newMessageArray = [...oldMessageArray, newMessageData];
    this.setState({messages: newMessageArray });
    console.log(this.state.messages);
  }

  updateUserCount(newStatus){
    this.setState({totalUsers: newStatus.content});
    console.log(this.state.totalUsers);
  }
  
  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} submitMessage={this.submitMessage} submitNotification={this.submitNotification}/>
      </div>
    );
  }
}

export default App;
