import React, { Component } from 'react';
// import styles
import './App.css';
// import firebase
import firebase from './firebase';
// import components
import Header from './Header';
import Footer from './Footer';
import SendMessage from './SendMessage';
import MessagesList from './MessageList';

// const messagesArray = [];

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      userInput: ''
    }
  }

  componentDidMount() {
    // connect app to firebase (messages stored in the messages branch)
    const dbRef = firebase.database().ref('messages');
    
    // when the database changes (newMessages array) grab the data in the database
    dbRef.on('value', (snapshot) => {
    const messagesObject = snapshot.val();
    // console.log(messagesObject);

    // change data coming from database: from object to array
    const messagesArray = [];
    for (let key in messagesObject) {
      // create obeject to store each message
      const individualMessageObject = {
        messageId: key,
        messageText: messagesObject[key]
      }
      // push each message object into the array
      messagesArray.push(individualMessageObject);
    }
    console.log(messagesArray);
    
    // set state with new messages
    this.setState({
      messages: messagesArray
    })
    });    
  }  

  handleChange = (event) => {
    // console.log(`Hiii`);
    this.setState({
      userInput: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(`clicked button`);
    const dbRef = firebase.database().ref('messages');
    // clone the array of database message objects using spread
    const newMessagesArray = [...this.state.messages];
    // console.log(newMessagesArray);
    
    // const newMessageList = dbRef.value();
    // console.log(dbRef);
    const messageToBeAdded = this.state.userInput;
    // console.log(messageToBeAdded);
    // add messageToBeAdded to firebase (so that the dbRef listener will will be called and it will update the state and cause app to re-render)

    const newIndividualMessageObject = {
      messageId: "",
      messageText: messageToBeAdded
    }
    // console.log(newIndividualMessageObject);
    

    // first check to see if the length of the current messagesArray is less than 100 (current messageArray was set in the state during componentDidMount- whatever messages were in the database on mount were brought down, covereted to an array and set in state)
    // also check if the message is just an empty string
    if (messageToBeAdded !== '') {
      if (newMessagesArray.length < 100) {
        console.log(`there are less than 100 messages in here!`);
        newMessagesArray.push(newIndividualMessageObject);
      } else {
        // remove the first message
        newMessagesArray.shift();
        // then add the new message to the end
        newMessagesArray.push(newIndividualMessageObject)
      }
      dbRef.set(newMessagesArray);
    }
    console.log(newMessagesArray);
    // reset the userInput for the next message
    // this.setState({
    //   userInput: ''
    // }); 

  }
  

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <MessagesList />
          <SendMessage 
          onTextInput={this.handleChange} 
          textInputValue={this.state.userInput}
          onButtonClick={this.handleSubmit}
          />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
