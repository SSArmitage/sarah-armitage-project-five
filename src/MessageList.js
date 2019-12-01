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
        let divStyleOtherUser = {
            borderColor: 'blue'
            // backgroundColor: 'purple',
            // backgroundImage: 'url(' + imgUrl + ')',
        };
        const arrayUSM = this.props.messagesUSM
        const array= this.props.messages


        return(
            <div className="wrapper messageListContainer">
                    <div className="messageBox">
                        {array.map((message) => {
                            return (
                                <li 
                                className="message"
                                style={divStyle} >
                                    <p>{message.username}</p>
                                    <p>{message.text}</p>
                                </li>
                            )
                        })}
                    </div>
            </div>
        );
    };
}

export default MessageList;