import React, { Component } from 'react';

class MessageList extends Component {
    render() {
        return(
            <div className="wrapper messageListContainer">
                <div className="messageBox">
                    {this.props.messages.map((message) => {
                        return(
                            <li className="message">{message}</li>
                        )
                    })}
                </div>
            </div>
        );
    };
}

export default MessageList;