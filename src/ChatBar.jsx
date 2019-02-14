import React, {Component} from 'react';

class ChatBar extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: this.props.currentUser.name,
            usernameColor: this.props.currentUser.userColor,
            comment: ''
        }

        this.updateMessageState = this.updateMessageState.bind(this);
        // this.updateUserName = this.updateUserName.bind(this);

    }

    updateMessageState(event){
        this.setState({comment: event.target.value })
    }

    // updateUserName(userName){
    //     this.setState({username: userName });
    // }

    _handleKeyPress = (event) => {
    
        if (event.key === 'Enter' ) {

            if (event.target.name === "username"){
                
                const newNotification = {
                    type: "postNotification",
                    content: `User ${this.state.username} has changed their name to ${event.target.value}`
                }

                this.props.submitNotification(newNotification);
                this.props.updateUserName(event.target.value);
            }

            if (event.target.name === "message"){
               
                const newMessage = {
                    type: "postMessage",
                    username: this.state.username,
                    usernameColor: this.state.usernameColor,
                    content: this.state.comment
                }
    
                event.target.value = "";
    
                this.props.submitMessage(newMessage);
            }
        }
    }

    render() {
        return (
            <footer className="chatbar">
                {/* <input className="chatbar-username" name="username" placeholder="Your Name (Optional)" value={this.props.currentUser}/> */}
                {/* <input className="chatbar-username" name="username" placeholder="Your Name (Optional)" onChange={this.updateUserName} value={this.state.username}/> */}

                <input className="chatbar-username" name="username" placeholder="Your Name (Optional)" onKeyPress={this._handleKeyPress} placeholder="Your name. Hit 'Enter'"/>
                <input className="chatbar-message" name="message" placeholder="Type a message and hit ENTER" onChange={this.updateMessageState} onKeyPress={this._handleKeyPress} />
            </footer>
        )
    }
}

export default ChatBar;
