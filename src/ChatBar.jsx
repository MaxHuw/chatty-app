import React, {Component} from 'react';

class ChatBar extends Component {
    render() {
        return (
            <footer class="chatbar">
                <input class="chatbar-username" placeholder="Your Name (Optional)" />
                <input class="chatbar-message" placeholder="Type a message and hit ENTER" />
            </footer>
        )
    }
}

export default ChatBar;
