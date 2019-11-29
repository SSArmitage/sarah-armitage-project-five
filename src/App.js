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
    
    // when the database changes (newMessages array) grab the data in the database (will come back as an array)
    dbRef.on('value', (snapshot) => {
    const messagesArray = snapshot.val();
    console.log(messagesArray);

    // change data coming from database: from object to array
    // const messagesArray = [];
    // for (let key in messagesObject) {
    //   // create obeject to store each message
    //   const individualMessageObject = {
    //     messageId: key,
    //     messageText: messagesObject[key]
    //   }
    //   // push each message object into the array
    //   messagesArray.push(individualMessageObject);
    // }
    // console.log(messagesArray);
    
    // set state with messagesArray from databse
    this.setState({
      messages: messagesArray
    })
    });
    
    // const dbRefArray = firebase.database().ref('-LurPv3mNjJjUBfdyESF');
    // dbRefArray.on('value', (snapshot) => {
    //   const testArrayFromDB = snapshot.val();
    //   console.log("I am the test", testArrayFromDB);
    // })
      
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
    // will use dbRef when pushing up the new array to the database
    const dbRef = firebase.database().ref('messages');
    // clone the array of database messages from state using spread
    const newMessagesArray = [...this.state.messages];
    console.log("cloned array", newMessagesArray);
    // grab the message inputted by the user (held in state)
    const messageToBeAdded = this.state.userInput;
    console.log(messageToBeAdded);
    
    // add messageToBeAdded to the cloned array, and push that array up to firebase (use set to replace the previous array up there)
    // first check to see if the length of the newMessagesArray is less than 100 
    // also check if the message is just an empty string
    // then add messageToBeAdded to newMessagesArray
    // then set in firebase (so that the dbRef listener will will be called and it will update the this.state.messages and cause app to re-render with the new message added to the list of messages)

    // if the user's input is not empty, enter statment:
    if (messageToBeAdded !== '') {
      console.log("I am not empty");

      // if the cloned messages array is less than 100:
      if (newMessagesArray.length < 100) {
        console.log(`there are less than 100 messages in here!`);
        // add the new message to the array
        newMessagesArray.push(messageToBeAdded);
        console.log(newMessagesArray);
        

        // else if the cloned messages array is greater than 100:
      } else {
        // remove the first message from the array (index=0)
        newMessagesArray.shift();
        // then add the new message to the end
        newMessagesArray.push(messageToBeAdded);
        console.log(newMessagesArray);
      }
      // dbRef.set(newMessagesArray);

    } else {
      console.log("I am empty");
    }

    // push the newMessagesArray up to firebase (set to replace)
    dbRef.set(newMessagesArray);

    // console.log(newMessagesArray);
    // reset the userInput for the next message
    this.setState({
      userInput: ''
    }); 

  }
  

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <MessagesList 
          messages={this.state.messages}/>
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
