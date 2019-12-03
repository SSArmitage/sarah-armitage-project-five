import React, { Component } from 'react';
import firebase from './firebase';
import ScrollToBottom from 'react-scroll-to-bottom';

class MessageList extends Component {
    render() {
        // change color of message borders based on user selection (passed down as a prop from App.js)
        // const arrayUSM = this.props.messagesUSM
        // don't think I need this user specific messages anymore??? (have usernames atatched to messages now)
        const user = this.props.user;
        console.log(user.displayName);
        
        const array = this.props.messages;
        let messageStyle;
        let messageStyleOtherUser;

        messageStyle = {
            backgroundColor: 'blueviolet'
        };
        // default color for the other users
        messageStyleOtherUser = {
            backgroundColor: '#0392cf'
        };

        // find the uid associated with the username and match based on that for color
        return(

            <div className="messageArea">
                <div className="wrapper messageListContainer">
                        <ScrollToBottom className="messageBox">
                            {   
                                
                            array.map((message) => {
                                if (message.username === user.displayName) {
                                    return(
                                        <li
                                            className="message currentUserPosition"
                                            style={messageStyle} >
                                            <p 
                                            className="userName">
                                            {message.username}</p>
                                            <p
                                            className="dateAndTime">
                                            {`${message.date} ${message.time}`}</p>
                                            <p 
                                            className="messageText">
                                            {message.text}</p>
                                        </li>
                                    )
                                } else {
                                    return(
                                        <li
                                            className="message"
                                            style={messageStyleOtherUser} >
                                            <p 
                                            className="userName">{message.username}</p>
                                            <p
                                            className="dateAndTime">
                                            {`${message.date} ${message.time}`}</p>
                                            <p
                                            className="messageText">
                                            {message.text}</p>
                                        </li>
                                    )
                                }
                            })}
                        </ScrollToBottom>
                </div>
            </div>
        );
    };
}

export default MessageList;