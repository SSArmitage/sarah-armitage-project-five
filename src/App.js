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
import SignInLogIn from './SignInLogIn';

// const messagesArray = [];

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      userSpecificMessages: [],
      messagesFiltered: [],
      userInput: '',
      currentUser: null,
      username: '',
      uid: '',
      email: '',
      password: '',
      settingsPage: false,
      theme: {
        messageColor: ''
      }
    }
  }

  componentDidMount() {
    // connect app to firebase (messages stored in the messages branch)
    const dbRef = firebase.database().ref('messages');
    const dbRefUSM = firebase.database().ref('userSpecificMessages');
    
    // when the database changes (newMessages array) grab the data in the database (will come back as an array)
    dbRef.on('value', (snapshot) => {
    const messagesArray = snapshot.val();
    console.log(messagesArray);
    
    // set state with messagesArray from databse
    this.setState({
      messages: messagesArray
    })

    // grab the user's custom theme colour
    // const dbRefUsers = firebase.database().ref('users');
    // console.log(dbRefUsers);
    });

    dbRefUSM.on('value', (snapshot) => {
      const messagesArray = snapshot.val();
      console.log(messagesArray);

      // set state with messagesArray from databse
      this.setState({
        userSpecificMessages: messagesArray
      })
    });

    // set an event listener for user login status
    // listen for change in user auth status (is user logged in or not?)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log("I am logged in");
        console.log(user);
        // if the user is signed it, set the user object to the current user in state (current user will go from null -> user object), this will conidtionally render the chat page
        this.setState({
          currentUser: user,
          uid: user.uid
        })

        // grab the user's custom theme colour from the database and set that in state, so that the messages will be updated to have that color
        const dbRefUsers = firebase.database().ref('users');
        dbRefUsers.on('value', (snapshot) => {
          const usersInfo = snapshot.val();
          this.setState({
            theme: {
              messageColor: usersInfo[`${this.state.uid}`].themeColor
            }
          })
        })


      } else {
        // No user is signed in.
        // currentUser in state will be set to null, will show login page
        console.log("I am not logged in");
        this.setState({
          currentUser: null
        })
      }

      // get user info (use this info to differenitate the users text bubbles?)
      const currentUser = firebase.auth().currentUser;
      if (currentUser != null) {
        const userName = user.displayName;
        const userEmail = user.email;
        const userPhotoUrl = user.photoURL;
        const userEmailVerified = user.emailVerified;
        const userUid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken( instead.
        console.log(userUid);
        console.log(userName);
        
      }
    });
    
    // 
    // // grab the user's custom theme colour from the database
    const dbRefUsers = firebase.database().ref('users');
    dbRefUsers.on('value', (snapshot) => {
      const usersInfo = snapshot.val();
      // console.log(this.state.theme.messageColor);
      
      // console.log(usersInfo);
      // // console.log(this.state.uid);
      // const userObject = usersInfo[`${this.state.uid}`];
      // console.log(userObject);
      // console.log(this.state.uid);
      
      // const userObject = usersInfo[`${this.state.user}`];
      // console.log(userObject);
      // const userThemeSelection = userObject.themeColor;
      // console.log(userThemeSelection);

      // push the slected theme color up to the databsae (use set to replace the previous one)
      // console.log(usersInfo.uid);
      
      // firebase.database().ref().child('users').child(this.state.uid).set(this.state.theme.messageColor)
    });

    // set an event listener for 

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
    const dbRefUSM = firebase.database().ref('userSpecificMessages');
    // clone the array of database messages from state using spread
    // const newMessagesArray = [...this.state.messages];
    // const newUserSpecificMessagesArray = [...this.state.userSpecificMessages];
    // console.log("cloned array", newMessagesArray);

    // clone the array of databast message objects from state using Object.assign method
    // cant use spread b/c it is a shalow copy and woulndt copy the nested elements
    const newMessagesArray = [];
    Object.assign(newMessagesArray, this.state.messages);
    console.log("cloned array", newMessagesArray);
    const newUserSpecificMessagesArray = [];
    Object.assign(newUserSpecificMessagesArray, this.state.userSpecificMessages);
    console.log("cloned array", newUserSpecificMessagesArray);

    // grab the message inputted by the user (held in state)
    // const messageToBeAdded = this.state.userInput;
    const messageToBeAdded = {
      username: this.state.currentUser.displayName,
      text: this.state.userInput
    };
    console.log(messageToBeAdded);
  

    
    // add messageToBeAdded to the cloned array, and push that array up to firebase (use set to replace the previous array up there)
    // first check to see if the length of the newMessagesArray is less than 100 
    // also check if the message is just an empty string
    // then add messageToBeAdded to newMessagesArray
    // then set in firebase (so that the dbRef listener will will be called and it will update the this.state.messages and cause app to re-render with the new message added to the list of messages)

    // if the user's input is not empty, enter statment:
    if (messageToBeAdded.text !== '') {
      console.log("I am not empty");

      // if the cloned messages array is less than 100:
      if (newMessagesArray.length < 100) {
        console.log(`there are less than 100 messages in here!`);
        // add the new message to the array
        newMessagesArray.push(messageToBeAdded);
        newUserSpecificMessagesArray.push(messageToBeAdded);
        console.log(newMessagesArray);
        

        // else if the cloned messages array is greater than 100:
      } else {
        // remove the first message from the array (index=0)
        newMessagesArray.shift();
        newUserSpecificMessagesArray.shift();
        // then add the new message to the end
        newMessagesArray.push(messageToBeAdded);
        newUserSpecificMessagesArray.push(messageToBeAdded);
        console.log(newMessagesArray);
      }
      // dbRef.set(newMessagesArray);

    } else {
      console.log("I am empty");
    }

    // push the newMessagesArray up to firebase (set to replace)
    dbRef.set(newMessagesArray);
    dbRefUSM.set(newUserSpecificMessagesArray);

    // ****************************************
    // filter through arrays
    // const twoArray = this.state.messages;
    // const oneArray = this.state.userSpecificMessages;
    // twoArray.forEach((message) => {
    //   if (oneArray.includes(message)) {
    //     console.log(message);
        
    //   }
    // })

    // console.log(newMessagesArray);
    // reset the userInput for the next message
    this.setState({
      userInput: ''
    }); 
  }
  // -------------------- AUTHENTICATION ---------------------
  // grab user email for sign up
  handleSignUpEmail = (event) => {
   this.setState({
     email: event.target.value
   })
  }

  // grab user password for sign up
  // need to put notifcation for user -> password needs to be > 6 characters long
  hanldeSignUpPassword = (event) => {    
    this.setState({
      password: event.target.value
    })
  }

  // when user clicks sign up button
  handleSignUpSubmit = (event) => {
    event.preventDefault();
    console.log("I clicked the button!");
    // create new account for user
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      // handle errors here
      console.log(error);
    })
  }

  // grab user email for sign in
  handleSignInEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  // grab user password for sign in
  hanldeSignInPassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  // when user clicks sign in button
  handleSignInSubmit = (event) => {
    event.preventDefault();
    console.log("I clicked the button!");
    // change in user auth status fires the auth event listener
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

  handleLogOut = (event) => {
    // change in user auth status fires the auth event listener
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      console.log(`I was signed out`);
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });
  }

  // grab user's desire username 
  handleUserName = (event) => {
    this.setState({
      username: event.target.value
    })
  }
  // send username to firebase auth
  handleSaveUserName = (event) => {
    event.preventDefault();

    const user = firebase.auth().currentUser;
    const userName = user.displayName;
    user.updateProfile({
      displayName: this.state.username,
      // photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function () {
      // Update successful.
      console.log('successfully updated username');
      const userName = user.displayName;
      console.log(userName);
      
    }).catch(function (error) {
      // An error happened.
      console.log('did not successfully updated username');
    });

    this.setState({
      username: ''
    });
  }


  
  // ---------------- END OF AUTHENTICATION ------------------

  handleThemeColorChange = (event) => {
    this.setState({
      theme: {
        messageColor: event.target.value
      } 
    })
    console.log("I picked a different color!");
    // console.log(event.target.value);
    const uid = this.state.currentUser.uid
    console.log(uid);
    console.log(this.state.theme.messageColor);
    
    // push the theme color selected by the user up to firebase (save it in under the user's specific uid #)
    // const uid = firebase.auth().currentUser.uid;
    firebase.database().ref().child('users').child(uid).set({
      themeColor: `${this.state.theme.messageColor}`
    })
    
  }

  render() {
    return (
      <div className="App">
        <Header
        logOut={this.handleLogOut}
        changeThemeColor={this.handleThemeColorChange}
        username={this.state.username}
        userName={this.handleUserName} 
        onButtonClickUserName={this.handleSaveUserName}/>
        <main>
          {this.state.currentUser === null 

          ? 

          <SignInLogIn 
          emailSignUp={this.handleSignUpEmail}
          passwordSignUp={this.hanldeSignUpPassword}
          onButtonClickSignUp={this.handleSignUpSubmit}
          emailSignIn={this.handleSignInEmail}
          passwordSignIn={this.hanldeSignInPassword}
          onButtonClickSignIn={this.handleSignInSubmit}/>

          : 
          
          <div className="content">
            <p>signed in</p>
            <MessagesList 
            messages={this.state.messages}
            messagesUSM={this.state.userSpecificMessages}
            messageColor={this.state.theme.messageColor}/>
            <SendMessage 
            onTextInput={this.handleChange} 
            textInputValue={this.state.userInput}
            onButtonClick={this.handleSubmit}
            />
          </div>
          }
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
