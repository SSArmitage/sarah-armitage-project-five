import React, { Component } from 'react';
// import firebase from './firebase';
import ScrollToBottom from 'react-scroll-to-bottom';

class MessageList extends Component {
    constructor() {
        super();
        // create a ref to store the messageBox and message DOM elements
        this.messageBox = React.createRef();
        this.message = React.createRef();
        this.state = {
            messageBox: '',
            lastMessage:''
        }
    }
    componentDidMount() {
        // console.log(`Messages are mounting!`);
        // const messageBox = document.querySelector('.messageBox')
        // console.log(messageBox);
        // // console.log(this.message.current);
        // const lastMessage = document.querySelector('.message:last-of-type')
        // console.log(lastMessage);
        // this.setState({
        //     messageBox: messageBox,
        //     lastMessage: lastMessage
        // })
        // if the last message (li element) is not "null," then that means all the messages have been parsed and the last one can be accessed
        // if the last message (li element) is "null," then the browser hasn't parsed the HTML yet => the document.querySelector() returns null => the offsetTop property of the null will result in the Uncaught TypeError message: "Cannot read property 'offsetTop' of null" => temporary fix => use a setTimeout to wait for the messages to be parsed, so that the last message can be accessed and used as the scroll to point
        // Need to determine where the hold up is and use a promise to ensure that the messages arent requested until after they are all parsed (maybe add a progress icon to the messageBox until they all are available)
        if (this.message.current) {
            // when the component mounts, want to display the latest message (instead of scrolling, just want to appear at that message)
            this.startAtLastMessage()
        } else {
            // console.log(`Messages not loaded yet`);
            // console.log(this.message.current);
            setTimeout(() => {
                this.startAtLastMessage()
            }, 2000);
        }
    }

    componentDidUpdate() {
        console.log(`Messages are updating!`);
        // const messageBox = document.querySelector('.messageBox')
        // console.log(messageBox.scrollHeight);
        // console.log(this.message.current)
        // const lastMessage = document.querySelector('.message:last-of-type')
        // console.log(lastMessage);
        // when the component updates and re-renders the messages, want to display the latest message (instead of scrolling, just want to appear at that message)
        const messageBox = document.querySelector('.messageBox')
        if (messageBox) {
            this.startAtLastMessage()
        }
    }

    hanldeScrollButtonClick = () => {
        // when the scroll arrow is clicked, want to scroll to the most recent message (instead of just appearing at the last message)
        this.scrollToLastMessage()
    }

    // APPEAR at last message
    startAtLastMessage = () => {
        console.log(`Start at last message`);
        // console.log(this.message.current);
        // const lastMessage = document.querySelector('.message:last-of-type')
        // console.log(lastMessage);
        
        // grab the messageBox
        // const messageBox = this.messageBox.current
        const messageBox = document.querySelector('.messageBox')
        // offsetTop => returns the number of pixels from the top of the closest relatively positioned parent element
        // get the distance from the top of the component to the top of the messageBox
        // const messageBoxTop = this.messageBox.current.offsetTop
        const messageBoxTop = messageBox.offsetTop
        // grab the last message
        const lastMessage = document.querySelector('.message:last-of-type')
        // get the distance from the top of the messageBox to the last message
        // const lastMessageTop = this.message.current.offsetTop
        const lastMessageTop = lastMessage.offsetTop
        console.log(lastMessageTop);
        // const lastMessageHeight = lastMessage.offsetHeight
        // console.log(lastMessageHeight);
        // const lastMessageBottom = lastMessageTop - lastMessageHeight
        // console.log(lastMessageBottom);
        // subtraction gives you the distance between the top of the messageBox and the last message => gives the amount of pixels you need to scroll to get to the last message position
        messageBox.scrollTop = lastMessageTop - messageBoxTop
        // messageBox.scrollTop = messageBox.scrollHeight
    }

    // SCROLL to last message
    scrollToLastMessage = () => {
        // grab the last message 
        // const lastMessage = this.message.current
        const lastMessage = document.querySelector('.message:last-of-type')
        console.log(lastMessage);
        // scrollIntoView() => scrolls the specified element into the visible area of the browser window
        // scrolls the element's parent container
        // since no argument is passed into (), it will scroll to the top of the element
        lastMessage.scrollIntoView({
            behavior: 'smooth'
        });
    }

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
            // backgroundColor: 'blueviolet'
            backgroundColor: '#06a8de',
            color: 'whitesmoke'
        };
        // default color for the other users
        messageStyleOtherUser = {
            // backgroundColor: '#0392cf'
            backgroundColor: '#cdf1fd',
            color: 'rgba(28,28,28, 0.7)'
        };

        // let messageText;
       

        // find the uid associated with the username and match based on that for color
        return(
            <div className="messageArea">
                <div className="wrapperSideTwo messageListContainer">
                        {/* <ScrollToBottom className="messageBox"> */}
                        <ul 
                        className="messageBox"
                        ref={this.messageBox}>
                            
                            {   
                                
                            array.map((message) => {
                                // let reMessage = new RegExp(message.text);
                                // console.log(message.text);
                                
                                // if the message has a gif url in it, then grab that url
                                // check that it has a "http" at the begining and a "gif" at the end
                                const myRe = /^(http.*\.gif)$/;
                                let messageGifUrl = message.text.match(myRe);
                                // console.log(messageGifUrl);
                        
                                // if the message to be rendered is asscoiated with the current user logged in, make their text bubbles PURPLE
                                // OR
                                // if the message to be rendered is associated with a guest, make their text bubbles PURPLE
                                if (this.props.user.isAnonymous === false) {
                                    // console.log("I am not a guest");
                                    // console.log(message.username);
                                    // console.log(user.displayName);
                                    
                                    
                                    // if (message.username === user.displayName) {
                                    if (message.userId === user.uid) {
                                        return (
                                            <li
                                                className="message currentUserPosition rightMessage"
                                                style={messageStyle} >
                                                <p
                                                    className="userName">
                                                    {message.username}</p>
                                                <p
                                                    className="dateAndTime rightTimeStamp">
                                                    {`${message.date} ${message.time}`}</p>
                                                {/* <p 
                                            className="messageText">
                                            {message.text}</p> */}
                                                {messageGifUrl !== null
                                                    // if the search for a gif url in the message is not null (meaning there was a match and it does include a gif url), then render the gif image, otherwise just render the message without an image
                                                    ?
                                                    <p className="gifContainer">
                                                        <img 
                                                        className="gifImage"
                                                        src={messageGifUrl[0]}
                                                        alt="" />
                                                    </p>
                                                    :
                                                    <p>{message.text}</p>
                                                }
                                            </li>
                                        )
                                    } else {
                                        return (
                                            <li
                                                className="message leftMessage"
                                                style={messageStyleOtherUser} >
                                                <p
                                                    className="userName">{message.username}</p>
                                                <p
                                                    className="dateAndTime leftTimeStamp">
                                                    {`${message.date} ${message.time}`}</p>
                                                {/* <p
                                            className="messageText">
                                            {message.text}</p> */}
                                                {messageGifUrl !== null
                                                    // if the search for a gif url in the message is not null (meaning there was a match and it does include a gif url), then render the gif image, otherwise just render the message without an image
                                                    ?
                                                    <p className="gifContainer">
                                                        <img 
                                                        className="gifImage"
                                                        src={messageGifUrl[0]}
                                                        alt="" />
                                                    </p>
                                                    :
                                                    <p>{message.text}</p>
                                                }
                                            </li>
                                        )
                                    }
                                } else if (this.props.user.isAnonymous === true) {
                                    // console.log("I am a guest");
                                    // console.log(message.username);
                                    
                                    if (message.username === 'Guest') {
                                        return (
                                            <li
                                                className="message currentUserPosition rightMessage"
                                                style={messageStyle}
                                                ref={this.message}
                                                 >
                                                <p
                                                    className="userName">
                                                    {message.username}</p>
                                                <p
                                                    className="dateAndTime rightTimeStamp">
                                                    {`${message.date} ${message.time}`}</p>
                                                {/* <p 
                                            className="messageText">
                                            {message.text}</p> */}
                                                {messageGifUrl !== null
                                                    // if the search for a gif url in the message is not null (meaning there was a match and it does include a gif url), then render the gif image, otherwise just render the message without an image
                                                    ?
                                                    <p className="gifContainer">
                                                        <img 
                                                        className="gifImage"
                                                        src={messageGifUrl[0]}
                                                        alt="" />
                                                    </p>
                                                    :
                                                    <p>{message.text}</p>
                                                }
                                            </li>
                                        )
                                    } else {
                                        return (
                                            <li
                                                className="message leftMessage"
                                                style={messageStyleOtherUser} >
                                                <p
                                                    className="userName">{message.username}</p>
                                                <p
                                                    className="dateAndTime leftTimeStamp">
                                                    {`${message.date} ${message.time}`}</p>
                                                {/* <p
                                            className="messageText">
                                            {message.text}</p> */}
                                                {messageGifUrl !== null
                                                    // if the search for a gif url in the message is not null (meaning there was a match and it does include a gif url), then render the gif image, otherwise just render the message without an image
                                                    ?
                                                    <p className="gifContainer">
                                                        <img 
                                                        className="gifImage"
                                                        src={messageGifUrl[0]}
                                                        alt="" />
                                                    </p>
                                                    :
                                                    <p>{message.text}</p>
                                                }
                                            </li>
                                        )
                                    }
                                }
                            })}
                        {/* </ScrollToBottom> */}
                        <div 
                        className="scrollToBottom"
                        onClick={this.hanldeScrollButtonClick}>
                            <i class="fas fa-arrow-circle-down"></i>
                        </div>
                    </ul>
                </div>
            </div>
        );
    };
}

export default MessageList;