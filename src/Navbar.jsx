import React, {Component} from 'react';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <div className="user-count">User Count: {this.props.activeUsers}</div>
            </nav>
        )
    }
}
export default Navbar;



