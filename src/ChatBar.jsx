import React, {Component} from 'react';

class ChatBar extends Component {

    constructor(props){
        super(props);

    }

    //Check to see if a user has hit the enter key on either the username or message field.
    _handleKeyPress = (event) => {
    
        if (event.key === 'Enter' ) {

            //If it was the username field, construct a new notification object,
            // and submit it to the server, and update the currentUser in the main state.
            if (event.target.name === "username"){
                
                const newNotification = {
                    type: "postNotification",
                    content: `User ${this.props.currentUser} has changed their name to ${event.target.value}`
                }

                this.props.submitNotification(newNotification);
                this.props.updateCurrentUser(event.target.value);
            }

            //If it was the message field, create a new message object and send
            //it to the server. Reset field to blank.
            if (event.target.name === "message"){
               
                const newMessage = {
                    type: "postMessage",
                    username: this.props.currentUser,
                    content: event.target.value
                }
    
                event.target.value = "";
    
                this.props.submitMessage(newMessage);
            }
        }
    }

    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" name="username" placeholder="Your Name (Optional)" onKeyPress={this._handleKeyPress} placeholder="Your name. Hit 'Enter'"/>
                <input className="chatbar-message" name="message" placeholder="Type a message and hit ENTER" onKeyPress={this._handleKeyPress} />
            </footer>
        )
    }
}

export default ChatBar;
