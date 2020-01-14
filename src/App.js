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
import Settings from './Settings';
import getEmoji from './EmojiPicker';




class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      userSpecificMessages: [],
      messagesFiltered: [],
      userInput: '',
      tempUserInput: '',
      currentUser: null,
      username: '',
      uid: '',
      email: '',
      password: '',
      settingsPageClicked: false,
      selectedColorOption: '',
      theme: {
        messageColor: ''
      },
      date: '',
      time: '',
      userComputer: '',
      showEmojiPicker: false,
      userSignedIn: false,
      selectedEmoji: '',
      emojiString: '',
      selectedGifId: ''
    }
  }

  componentDidMount() {
    // connect app to firebase (messages stored in the messages branch)
    const dbRef = firebase.database().ref('messages');
    const dbRefUSM = firebase.database().ref('userSpecificMessages');
    
    // when the database changes (newMessages array) grab the data in the database (will come back as an array)
    dbRef.on('value', (snapshot) => {
    const messagesArray = snapshot.val();
    
    // set state with messagesArray from databse
    this.setState({
      messages: messagesArray
    })
    });

    // set an event listener for user login status
    // listen for change in user auth status (is user logged in or not?)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        // if the user is signed it, set the user object to the current user in state (current user will go from null -> user object), this will conidtionally render the chat page
        this.setState({
          currentUser: user,
          uid: user.uid
        })

        // ******** working on this functionality *********
        // grab the user's custom theme colour from the database and set that in state, so that the messages will be updated to have that color
        // const dbRefUsers = firebase.database().ref('users');
        // dbRefUsers.on('value', (snapshot) => {
        //   const usersInfo = snapshot.val();
        //   this.setState({
        //     theme: {
        //       messageColor: usersInfo[`${this.state.uid}`].themeColor
        //     }
        //   })
        // })


      } else {
        // No user is signed in.
        // currentUser in state will be set to null, will show login page
        this.setState({
          currentUser: null
        })
      }

      // get user info (use this info to differenitate the users text bubbles)
      const currentUser = firebase.auth().currentUser;
      if (currentUser != null) {
        const userName = user.displayName;
        const userEmail = user.email;
        const userPhotoUrl = user.photoURL;
        const userEmailVerified = user.emailVerified;
        const userUid = user.uid;  // The user's ID, unique to the Firebase project
      }
    });
  } 

  handleChange = (event) => {
    this.setState({
      userInput: event.target.value
    })
    // when user types message, grab the date and time
    this.getDateAndTime();
    // when the user starts typing, make sure that the emojiPicker is closed (if open)
    this.setState({
      showEmojiPicker: false
    })
  }

  getGifInfoViaButton = (chosenGif) => {
    console.log("passing gif info...", chosenGif);
    console.log(chosenGif);

    // when user picks a gif, grab the date and time
    this.getDateAndTime();
    
    // only if there is a gif chosen by user, set the userInput in state to be that gif, else do not update state
    if (chosenGif) {
      this.setState({
        userInput: chosenGif
      })
    }
    
  }
  

  handleSubmit = (event, chosenGif) => {
    console.log(event, chosenGif);
    console.log(`I submitted the form!`);
    

    // this.setState({
    //   showEmojiPicker: false
    // })

    // if (chosenGif !== undefined) {
    //   console.log("I am not undefined");
    //   this.setState({
    //     // chosenGif is a string (gif url)
    //     userInput: chosenGif
    //   })
    // }
    
    event.preventDefault();
    // will use dbRef when pushing up the new array to the database
    const dbRef = firebase.database().ref('messages');
    const dbRefUSM = firebase.database().ref('userSpecificMessages');

    // clone the array of databast message objects from state using Object.assign method
    // cant use spread b/c it is a shalow copy and woulndt copy the nested elements
    const newMessagesArray = [];
    Object.assign(newMessagesArray, this.state.messages);
    const newUserSpecificMessagesArray = [];
    Object.assign(newUserSpecificMessagesArray, this.state.userSpecificMessages);

    // grab the message inputted by the user (held in state)
    const messageToBeAdded = {
      username: this.state.currentUser.displayName,
      userId: this.state.currentUser.uid,
      text: this.state.userInput,
      date: this.state.date,
      time: this.state.time
    };
    console.log(messageToBeAdded);
    

    // add messageToBeAdded to the cloned array, and push that array up to firebase (use set to replace the previous array up there)
    // first check to see if the length of the newMessagesArray is less than 100 
    // also check if the message is just an empty string
    // then add messageToBeAdded to newMessagesArray
    // then set in firebase (so that the dbRef listener will will be called and it will update the this.state.messages and cause app to re-render with the new message added to the list of messages)

    // if the user's input is not empty, enter statment:
    if (messageToBeAdded.text !== '') {
      // if the cloned messages array is less than 100:
      if (newMessagesArray.length < 100) {
        // add the new message to the array
        newMessagesArray.push(messageToBeAdded);
        newUserSpecificMessagesArray.push(messageToBeAdded);

        // else if the cloned messages array is greater than 100:
      } else {
        // remove the first message from the array (index=0)
        newMessagesArray.shift();
        newUserSpecificMessagesArray.shift();
        // then add the new message to the end
        newMessagesArray.push(messageToBeAdded);
        newUserSpecificMessagesArray.push(messageToBeAdded);
      }
      // else message is empty
    } else {
      console.log("The gif did not make it into the db");
      
    }

    // push the newMessagesArray up to firebase (set to replace)
    dbRef.set(newMessagesArray);
    dbRefUSM.set(newUserSpecificMessagesArray);

    // reset the userInput for the next message
    // reset the date and time for next message
    this.setState({
      userInput: '',
      date: '',
      time: '',
      showEmojiPicker: false
    }); 
  }

  // -------------------- AUTHENTICATION ---------------------
  // ----- SIGN UP -----
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
    if (this.state.password.length < 6) {
      alert('Your password must be 6 characters or longer');
    }
    // create new account for user
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      // handle errors here
    })
  }
// ----- SIGN IN -----
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

    // change in user auth status fires the auth event listener
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // handle incorrect sign in password
      alert('You have entered either an incorrect email or password');
    });
    // make sure the settings page is closed when user logs out
    this.setState({
      settingsPageClicked: false
    })
  }

// ----- SIGN OUT -----
  handleLogOut = (event) => {
    // change in user auth status fires the auth event listener
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

// ----- UPDATE USERNAME -----
  // grab user's desired username 
  handleUserName = (event) => {
    this.setState({
      username: event.target.value
    })
  }
  // send username to firebase auth on button submit
  handleSaveUserName = (event) => {
    event.preventDefault();

    const user = firebase.auth().currentUser;
    const userName = user.displayName;
    user.updateProfile({
      displayName: this.state.username,
      // going to add the ability to add display picture
      // photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function () {
      // Update successful.
      const userName = user.displayName;
      
    }).then(() => {
      // call fxn to update username in databse (ensures it stays up to date in the message history)
      this.updateUserNameInDB()
    }).catch(function (error) {
      // An error happened.
    });

    this.setState({
      username: '',
      settingsPageClicked: !this.state.settingsPageClicked
    });
  }

  // function to update username in database messages when the user changes their username
  updateUserNameInDB = () => {
    // reference to firebase, will use when sending array of messages with updated usernmes back up tp the DB
    const dbRef = firebase.database().ref('messages');
    const newMessagesArray = [];
    // make a copy of the array held in this.state.messages (most recent copy of the mesages in firebase) and save it to an array called newMessagesArray
    Object.assign(newMessagesArray, this.state.messages);

    // keep the username up to date for all messages of a user (when/if a user changes their username, want to update all the messages they sent to have the current username)
    newMessagesArray.forEach((message) => {
      // if the userId of the message matches the current user's Id, then update that message to have the user's current username
      if (message.userId === this.state.currentUser.uid) {
        message.username = this.state.currentUser.displayName
      }
    })
    // once the array has been updated so that all the messages have the new username, push that array up to firebase (this will cause a re-render and this.state.messages will be updated with the new array, and you will see the new username reflected in all the preivious messages)
    dbRef.set(newMessagesArray);
  }
  
  // ---------------- END OF AUTHENTICATION ------------------

  handleThemeColorChange = (event) => {
    this.setState({
      theme: {
        messageColor: event.target.value
      } 
    })
    const uid = this.state.currentUser.uid;
    
    // push the theme color selected by the user up to firebase (save it in under the user's specific uid #)
    firebase.database().ref().child('users').child(uid).set({
      themeColor: `${this.state.theme.messageColor}`
    })
  }

  //--------------- DATE & TIME STAMP -----------------
  // function to grab the date and time (to use in messages)
  getDateAndTime = () => {
    // get the date
    const day = new Date().getDate(); //Current Day
    const monthNumber = new Date().getMonth(); //Current Month
    const year = new Date().getFullYear(); //Current Year
    // convert monthNumber into monthYear
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthWord = months[monthNumber];
    const dateFull = `${monthWord} ${day}, ${year}`;
    // get the time
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const sec = new Date().getSeconds(); //Current Seconds
    // make 24hour clock array
    const timeMilitary = []
    for (let i = 0; i <= 24; i++) {
      timeMilitary.push(i);
    }

    // make the 12hour clock array
    const timeNormal = [];
    for (let x = 1; x <= 2; x++) {
      for (let i = 1; i <= 12; i++) {
        timeNormal.push(i);
      }
    }
    timeNormal.unshift(12)

    // convert the 24hour clock time into 12hour clock time
    const timeIndex = timeMilitary.indexOf(hours);
    const time = timeNormal[timeIndex];
    // i.e. have: 14 22 31
    // need: 2:22
    const timeActual = `${time}:${min}`;

    // ---------------------------
    // The final date and time stamp
    // use: dateFull & timeActual
    // ---------------------------

    // save the date and time in state (will be grabbed and attached to "message" when user clicks submit button)
    this.setState({
      date: dateFull,
      time: timeActual
    })
  }

  // when the user clicks on the hamburger icon the settings menu will appear (in the main)
  handleSettingsClick = () => {
    this.setState({
      settingsPageClicked: !this.state.settingsPageClicked
    })
  }

  // when the user clicks on the emoji icon, change the state of showEmojiPicker to true
  handleEmojiClick = (event) => {
    event.preventDefault();
    const newState = !this.state.showEmojiPicker;
    this.setState({
      showEmojiPicker: newState
    })
  }

  hanldleColorChange = (event) => {
    // working on adding this
    // this.setState({
    //   theme: {
    //     messageColor: event.target.value;
    //   }
    // })
  }

  handleEmojiSelection = (emoji) => {
    console.log(emoji);
    // this.setState({
    //   selectedEmoji: emoji
    // })
    // add emoji to the user input 
    // let temporaryUserInput = `${this.state.userInput}${emoji}`
    // this.setState({
    //   userInput: `${this.state.userInput}${emoji}`
    // })

    // clone the user input in state
    const temporaryUserInput = this.state.userInput;
    // append the emoji on to the end of the string the user is typing in the moment
    const newTemporaryUserInput = `${temporaryUserInput}${emoji}`
    console.log(newTemporaryUserInput);
    this.setState({
      userInput: newTemporaryUserInput
    })
  }

  // handleGif = (gifId) => {
  //   console.log("Passed id to app!");
    
  //   this.setState({
  //     selectedGifId: ''
  //   })
  // }
  

  render() {
    return (
      <div className="App">
        <Header
        headerChange={this.state.currentUser}
        handleSettingsClick={this.handleSettingsClick}/>
        <main>
          {/* first conditional: if the user variable in state is null, user is not logged in, in this case render the signup/login page
          if the user variable holds the current user object from firebase, the user is logged in, in this case render the MAIN page */}
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
          
          // second conditional
          // rendering of the MAIN section of the page
          // if the setting page icon was clicked it, the variable settingsPageClicked in state will be true, in this case render the settings page
          // else it is false, and in this case render the messaging page
          (this.state.settingsPageClicked === true
           
          ?

          <Settings 
          username={this.state.username}
          userName={this.handleUserName}
          onButtonClickUserName={this.handleSaveUserName}
          selectedColorOption={this.state.selectedColorOption}
          handleColorChange={this.handleColorChange}
          logOut={this.handleLogOut}/>

          :

          <div className="content">
            <MessagesList
              user={this.state.currentUser}
              messages={this.state.messages}
              messagesUSM={this.state.userSpecificMessages}
              messageColor={this.state.theme.messageColor} />
            <SendMessage
              onTextInput={this.handleChange}
              textInputValue={this.state.userInput}
              onEmojiClick={this.handleEmojiClick}
              showEmojiPicker={this.state.showEmojiPicker}
              onButtonClick={this.handleSubmit}
              sendEmojiIntoApp={this.handleEmojiSelection}
              sendGifToApp={this.handleGif}
              onFormButtonClick={this.getGifInfoViaButton}
            />
          </div>
          )
          }
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
