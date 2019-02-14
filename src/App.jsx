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
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }

    this.addNewMessage = this.addNewMessage.bind(this);
    this.submitMessage = this.submitMessage.bind(this);


  }

  ws = new WebSocket(URL);

  componentDidMount() {

    this.ws.onopen = () => {
      console.log("Connected to WS Server " + URL)
    }

    this.ws.onmessage = event => {
      console.log("Message recieved from server.")
      const message = JSON.parse(event.data);
      this.addNewMessage(message);
    }

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

  }
  
  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} submitMessage={this.submitMessage}/>
      </div>
    );
  }
}

export default App;
