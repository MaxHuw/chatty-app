import React, {Component} from 'react';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <a>User Count: {this.props.activeUsers}</a>
            </nav>
        )
    }
}
export default Navbar;



