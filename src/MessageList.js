import React, { Component } from 'react';
import firebase from './firebase';
import ScrollToBottom from 'react-scroll-to-bottom';

class MessageList extends Component {
    render() {
        // change color of message borders based on user selection (passed down as a prop from App.js)
        // const arrayUSM = this.props.messagesUSM
        // don't think I need this user specific messages anymore??? (have usernames atatched to messages now)
        const user = this.props.user;
        // console.log(user.displayName);
        
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

        // let messageText;
        
       

        // find the uid associated with the username and match based on that for color
        return(

            <div className="messageArea">
                <div className="wrapper messageListContainer">
                        <ScrollToBottom className="messageBox">
                            {   
                                
                            array.map((message) => {
                                // let reMessage = new RegExp(message.text);
                                // console.log(message.text);
                                
                                // if the message has a gif url in it, then grab that url
                                // check that it has a "http" at the begining and a "gif" at the end
                                const myRe = /^(http.*\.gif)$/;
                                let messageGifUrl = message.text.match(myRe);
                                // console.log(messageGifUrl);
                        
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
                                            {/* <p 
                                            className="messageText">
                                            {message.text}</p> */}
                                            {messageGifUrl !== null
                                            // if the search for a gif url in the message is not null (meaning there was a match and it does include a gif url), then render the gif image, otherwise just render the message without an image
                                            ?
                                            <p className="gifContainer">
                                                <img src={messageGifUrl[0]}/>
                                            </p>
                                            :
                                            <p>{message.text}</p>
                                            }
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
                                            {/* <p
                                            className="messageText">
                                            {message.text}</p> */}
                                            {messageGifUrl !== null
                                                // if the search for a gif url in the message is not null (meaning there was a match and it does include a gif url), then render the gif image, otherwise just render the message without an image
                                                ?
                                                <p className="gifContainer">
                                                    <img src={messageGifUrl[0]} />
                                                </p>
                                                :
                                                <p>{message.text}</p>
                                            }
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