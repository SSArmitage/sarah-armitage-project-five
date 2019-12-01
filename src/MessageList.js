import React, { Component } from 'react';
import firebase from './firebase';
import ScrollToBottom from 'react-scroll-to-bottom';

class MessageList extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         settingsPage: false
    //     }
    // }
    render() {
        // change color of message borders based on user selection (passed down as a prop from App.js)
        const arrayUSM = this.props.messagesUSM
        // don't think I need this user specific messages anymore??? (have usernames atatched to messages now)
        const user = this.props.user;
        console.log(user.displayName);
        
        const array = this.props.messages;
        let messageStyle;
        let messageStyleOtherUser;

        messageStyle = {
            borderColor: `${this.props.messageColor}`
            // backgroundColor: 'purple',
            // backgroundImage: 'url(' + imgUrl + ')',
        };
        // default color for the other users
        messageStyleOtherUser = {
            borderColor: 'blue'
            // backgroundColor: 'purple',
            // backgroundImage: 'url(' + imgUrl + ')',
        };
        return(
            <div className="wrapper messageListContainer">
                    {/* <div className="messageBox"> */}
                    <ScrollToBottom className="messageBox">
                        {   
                            
                        array.map((message) => {
                            if (message.username === user.displayName) {
                                return(
                                    <li
                                        className="message"
                                        style={messageStyle} >
                                        <p 
                                        className="userInfo">
                                        {message.username}</p>
                                        <p
                                        className="dateAndTime">
                                        {`${message.date} ${message.time}`}</p>
                                        <p>{message.text}</p>
                                    </li>
                                )
                            } else {
                                return(
                                    <li
                                        className="message"
                                        style={messageStyleOtherUser} >
                                        <p 
                                        className="userInfo">{message.username}</p>
                                        <p>{message.text}</p>
                                    </li>
                                )
                            }
                        })}
                    </ScrollToBottom>
                    {/* </div> */}
            </div>
        );
    };
}

export default MessageList;