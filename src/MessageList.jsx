import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';


class MessageList extends Component {
    render() {

        const messages = this.props.messages.map((message) => {

            if (message.type === "incomingMessage"){
               return <Message key={message.id.toString()} userColor={message.usernameColor} username={message.username} content={message.content} />;
            }

            if (message.type === "incomingNotification"){
               return <Notification key={message.id.toString()} content={message.content} />;
            }
        });
            
        return (
            <main className="messages">
                {messages}
            </main>
        )
    }
}

export default MessageList;