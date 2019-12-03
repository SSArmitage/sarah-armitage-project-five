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
// import 'react-native-emoji-selector';



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
      settingsPageClicked: true,
      selectedColorOption: '',
      theme: {
        messageColor: ''
      },
      date: '',
      time: '',
      userComputer: '',
      showEmojiPicker: false,
      userSignedIn: false
    }
  }

  determineWindowsOrMac = () => {
    // fxn to determine if users window is a Mac
    // if yes, returns true
    const isMacintosh = () => {
      return navigator.platform.indexOf('Mac') > -1
    }

    // isWindows = () => {
    //   return navigator.platform.indexOf('Win') > -1
    // }

    const isMac = isMacintosh();
    const isPC = !isMacintosh();
    console.log(isMac, isPC);

    // if isMacintosh is true, set the userComputer variable in state to be 'Mac'
    if (isMac) {
      this.setState({
        userComputer: 'Mac'
    })
    // if isMacintosh is false, set the userComputer variable in state to be 'PC'
    } else {
      this.setState({
        userComputer: 'PC'
    })
    }
  }  

  componentDidMount() {
    // Determine if users computer is windows or mac 
    // save it to state, then use this to run a set of keyboard codes to make the emoji keyboard to open
    this.determineWindowsOrMac();

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
    
    // // grab the user's custom theme colour from the database
    const dbRefUsers = firebase.database().ref('users');
    dbRefUsers.on('value', (snapshot) => {
      const usersInfo = snapshot.val();
    });

    // set an event listener for 
  } 

  handleChange = (event) => {
    // console.log(`Hiii`);
    this.setState({
      userInput: event.target.value
    })
    // when user types message, grab the date and time
    this.getDateAndTime();
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
      userId: this.state.currentUser.uid,
      text: this.state.userInput,
      date: this.state.date,
      time: this.state.time
    };
    console.log(messageToBeAdded);

    // need to go through all the messages and change the username to the current username
    // update the user specific messages array to have the current username
    // newUserSpecificMessagesArray.forEach((message) => {
    //   console.log(message);
    //   return(
    //     message.username = this.state.currentUser.displayName
    //   );
    // })
    // console.log(newUserSpecificMessagesArray);

    // ****************HERE HRER HERE **************
    // // keep the username up to date for all messages of a user (when/if a user changes their username, want to update all the messages they sent to have the current username)
    // // doesnt work yet!!!! still have old messages appearing as old name???
    // newMessagesArray.forEach((message) => {
    //   // console.log(message);
    //   // console.log(this.state.currentUser);
      
    //   // if the userId of the message matches the current user's Id, then update that message to have the users current username
    //   if (message.userId === this.state.currentUser.uid) {
    //     console.log(message.userId, this.state.currentUser.uid);
        
    //       message.username = this.state.currentUser.displayName
    //   }
    // })
    // then grab the total messages array (newMessagesArray) and compare to the user specific ones and update those to have the current username
    
  

    
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
    // reset the date and time for next message
    this.setState({
      userInput: '',
      date: '',
      time: ''
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
    if (this.state.password.length < 6) {
      alert('Your password must be 6 characters or longer');
    }
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
      // handle incorrect sign in password
      alert('You have entered either an incorrect email or password');
    });
    // make sure the settings page is closed when user logs out
    this.setState({
      settingsPageClicked: false
    })
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
      // photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function () {
      // Update successful.
      console.log('successfully updated username');
      const userName = user.displayName;
      console.log(userName);
      
    }).then(() => {
      // call fxn to update username in databse (ensures it stays up to date in the message history)
      this.updateUserNameInDB()
    }).catch(function (error) {
      // An error happened.
      console.log('did not successfully updated username');
    });

    this.setState({
      username: '',
      settingsPageClicked: !this.state.settingsPageClicked
    });
  }

  // function to update username is database messages when the user changes their username
  updateUserNameInDB = () => {
    // reference to firebase, will use when sending array of messages with updated usernmes back up tp the DB
    const dbRef = firebase.database().ref('messages');
    const newMessagesArray = [];
    // make a copy of the array held in this.state.messages (most recent copy of the mesages in firebase) and save it to an array called newMessagesArray
    Object.assign(newMessagesArray, this.state.messages);

    // keep the username up to date for all messages of a user (when/if a user changes their username, want to update all the messages they sent to have the current username)
    newMessagesArray.forEach((message) => {
      // if the userId of the message matches the current user's Id, then update that message to have the users current username
      if (message.userId === this.state.currentUser.uid) {
        console.log(message.userId, this.state.currentUser.uid);

        message.username = this.state.currentUser.displayName
      }
    })
    // once the array has been updated so that all the messages have the enw username, push that array up to firebase (this will cause a re-render and this.state.messages will be updated with the new array, and you will see the new username reflected in all the preivious messages)
    dbRef.set(newMessagesArray);
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
    console.log(dateFull);
    // get the time
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const sec = new Date().getSeconds(); //Current Seconds
    console.log(`${hours} ${min} ${sec}`);
    // make 24hour clock array
    const timeMilitary = []
    for (let i = 0; i <= 24; i++) {
      timeMilitary.push(i);
    }
    console.log(timeMilitary);

    // make the 12hour clock array
    const timeNormal = [];
    for (let x = 1; x <= 2; x++) {
      for (let i = 1; i <= 12; i++) {
        timeNormal.push(i);
      }
    }
    timeNormal.unshift(12)
    console.log(timeNormal);

    // convert the 24hour clock time into 12hour clock time
    const timeIndex = timeMilitary.indexOf(hours);
    console.log("the time index is:", timeIndex);
    const time = timeNormal[timeIndex];
    // have: 14 22 31
    // need: 2:22
    console.log(time);
    const timeActual = `${time}:${min}`;
    console.log(timeActual);

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

  // handleSettingsClick = (event, settingsPageStatus) => {
  //   this.setState({
  //     settingsPageClicked: !settingsPageStatus
  //   })
  //   console.log("Settings clicked!");
  // }

  // when the user clicks on the hamburger icon the settings menu will appear (in the main)
  handleSettingsClick = () => {
    this.setState({
      settingsPageClicked: !this.state.settingsPageClicked
    })
    console.log("Settings clicked!");
  }

  // when the user clicks on the emoji icon, 
  handleEmojiClick = (event) => {
    event.preventDefault();
    console.log('emoji was clicked!!!!');
    const newState = !this.state.showEmojiPicker;
    this.setState({
      showEmojiPicker: newState
    })
    // if (this.state.userComputer === 'Mac') {
    //   console.log(`I am a Mac`);
      
    // } else if (this.state.userComputer === 'PC') {
    //   console.log(`I am a PC`);
      
    // }
  }

  hanldleColorChange = (event) => {
    console.log("I picked a new color");
    
    // this.setState({
    //   theme: {
    //     messageColor: event.target.value;
    //   }
    // })
  }
  

  render() {
    return (
      <div className="App">
        <Header
        headerChange={this.state.currentUser}
        // userSignedIn={this.state.userSignedIn}
        // logOut={this.handleLogOut}
        // changeThemeColor={this.handleThemeColorChange}
        // username={this.state.username}
        // userName={this.handleUserName} 
        // onButtonClickUserName={this.handleSaveUserName}
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
            {/* <p>signed in</p> */}
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
