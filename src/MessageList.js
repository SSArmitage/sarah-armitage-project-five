import React, { Component } from 'react';

class MessageList extends Component {
    render() {
        return(
            <div className="wrapper">
                <div className="messageBox">
                    {this.props.messages.map((message) => {
                        return(
                            <li>{message}</li>
                        )
                    })}
                </div>
            </div>
        );
    };
}

export default MessageList;