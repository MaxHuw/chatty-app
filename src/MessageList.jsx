import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';


class MessageList extends Component {
    render() {

        //Go through the messages in the state array.
        const messages = this.props.messages.map((message) => {

            //If it is of type incomingMessage, create a new message.
            if (message.type === "incomingMessage"){
               return <Message key={message.id.toString()} username={message.username} content={message.content} />;
            }

            //If it is of type incoming notification, create a new notification.
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