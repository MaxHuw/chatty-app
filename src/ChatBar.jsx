import React, {Component} from 'react';

class ChatBar extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: this.props.currentUser,
            comment: ''
        }

        this.updateMessageState = this.updateMessageState.bind(this);
        this.updateUserName = this.updateUserName.bind(this);

    }

    updateMessageState(event){
        this.setState({comment: event.target.value })
    }

    updateUserName(userName){
        this.setState({username: userName });
    }

    _handleKeyPress = (event) => {
    
        if (event.key === 'Enter' ) {

            if (event.target.name === "username"){
                this.updateUserName(event.target.value);

                const newNotification = {
                    type: "postNotification",
                    content: event.target.value
                }

                this.props.submitNotification(newNotification);
            }

            if (event.target.name === "message"){
               
                const newMessage = {
                    type: "postMessage",
                    username: this.state.username,
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
