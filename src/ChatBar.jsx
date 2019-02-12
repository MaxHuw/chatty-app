import React, {Component} from 'react';

class ChatBar extends Component {

    // constructor(props){
    //     super(props);

    //     this.state = {
    //         user: this.props.currentUser,
    //         comment: ''
    //     }

    //     this.updateMessageState = this.updateMessageState.bind(this);
    // }

    // updateMessageState(event){
    //     this.setState({comment: event.target.value })
    // }

    _handleKeyPress = (event) => {
    
        if (event.key === 'Enter') {
            const newMessage = {
                username: event.target.previousSibling.value,
                content: event.target.value
            }

            event.target.value = "";

            this.props.addNewMessage(newMessage);
        }
    }

    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" name="username" placeholder="Your Name (Optional)" value={this.props.currentUser}/>
                <input className="chatbar-message" name="message" placeholder="Type a message and hit ENTER" onKeyPress={this._handleKeyPress} />
            </footer>
        )
    }
}

export default ChatBar;
