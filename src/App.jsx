import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const URL = 'ws://localhost:3001';

class App extends Component {

  constructor(props) {
    super();
    this.state = 
    {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }

    this.addNewMessage = this.addNewMessage.bind(this);

  }

  ws = new WebSocket(URL);

  componentDidMount() {
    this.ws.onopen = () => {
      console.log("Connected to WS Server " + URL)
    }
  }


  addNewMessage(newMessageData){
    const oldMessageArray = this.state.messages;
    const newMessage = {
      id: this.state.messages.length + 1,
      username: newMessageData.username,
      content: newMessageData.content
    }
    console.log(newMessage);
    const newMessageArray = [...oldMessageArray, newMessage];
    this.setState({messages: newMessageArray });

  }
  
  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} addNewMessage={this.addNewMessage}/>
      </div>
    );
  }
}

export default App;
