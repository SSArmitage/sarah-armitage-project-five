import React, { Component } from 'react';

class Header extends Component {
    render() {
        return(
            <header>
                <div className="wrapper">
                    <h1>Title</h1>
                    <button onClick={this.props.logOut}>Log Out</button>
                </div>
            </header>
        );
    };
}

export default Header;