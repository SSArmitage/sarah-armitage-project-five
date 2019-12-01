import React, { Component } from 'react';

class MessageList extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         settingsPage: false
    //     }
    // }
    render() {
        // change color of message borders based on user selection (passed down as a prop from App.js)
        let divStyle = {
            borderColor: `${this.props.messageColor}`
            // backgroundColor: 'purple',
            // backgroundImage: 'url(' + imgUrl + ')',
        };
        return(
            <div className="wrapper messageListContainer">
                    <div className="messageBox">
                        {this.props.messages.map((message) => {
                            return (
                                <li 
                                className="message"
                                style={divStyle} >
                                {message}</li>
                            )
                        })}
                    </div>
            </div>
        );
    };
}

export default MessageList;