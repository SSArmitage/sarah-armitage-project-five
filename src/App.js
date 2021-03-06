import React, { Component } from 'react';
// import styles
import './App.scss';
// import firebase
import firebase from './firebase';
// import components
import Header from './Header';
import Footer from './Footer';
import SendMessage from './SendMessage';
import MessagesList from './MessageList';
import SignUpLogIn from './SignInLogIn';
import Settings from './Settings';
// import getEmoji from './EmojiPicker';
import Aside from './Aside';
import animalNames from './animalNames.js'




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
      anonymousUser: false,
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
      // userSignedIn: false,
      selectedEmoji: '',
      emojiString: '',
      selectedGifId: '',
      scrollToLastMessage: false
    }
  }

  componentDidMount() {
    // connect app to firebase (messages stored in the messages branch)
    const dbRef = firebase.database().ref('messages');
    // const dbRefUSM = firebase.database().ref('userSpecificMessages');
    
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
      console.log(user);
      
      // if the user signed in as a guest (anonymously) => user.isAnonymous will be true
      // if (this.state.anonymousUser) {
      if (user.isAnonymous) {
        console.log(`I was signed in anonymously`);
        // Anonymous user signed in 
        if (user) {
          console.log('I am a guest');

          // grab a random animal for the guest's username (differentiates the guests in the chat room)
          const length = animalNames.length
          const ranNum = Math.floor((Math.random() * length) + 1)
          const animal = animalNames[ranNum]
          
          // if the user is signed it, set the user object to the current user in state (current user will go from null -> user object), this will conidtionally render the chat page
          this.setState({
            anonymousUser: true,
            currentUser: user,
            uid: user.uid,
            // username: `${animal}Guest`,
            username: `Guest`
          })
        } else {
          // No anonymous user is signed in.
          // currentUser in state will be set to null, will show login page
          this.setState({
            currentUser: null
          })
        }
        
      // if the user signed in under their own username/password 
      } else {

        if (user) {
          // User is signed in.
          // if the user is signed it, set the user object to the current user in state (current user will go from null -> user object), this will conidtionally render the chat page

          if (user.displayName === null && this.state.username) {
            // the user was just created and does not have a username saved to the account yet => need to update the account with the username in state
            this.setState({
              currentUser: user,
              uid: user.uid,
              // username: user.displayName
            }, () => {
              // call the function to update the username in DB
              this.handleSaveUserName()
            })

          } else {
            // the user already existed, just set their info in state
            this.setState({
              currentUser: user,
              uid: user.uid,
              username: user.displayName
            })
          }

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

        // username: this.state.currentUser.displayName


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
      // username: this.state.currentUser.displayName,
      username: this.state.username,
      userId: this.state.currentUser.uid,
      text: this.state.userInput,
      date: this.state.date,
      time: this.state.time,
      scrollToLastMessage: true
    };
    console.log(messageToBeAdded);
    

    // add messageToBeAdded to the cloned array, and push that array up to firebase (use set to replace the previous array up there)
    // first check to see if the length of the newMessagesArray is less than 100 
    // also check if the message is just an empty string
    // then add messageToBeAdded to newMessagesArray
    // then set in firebase (so that the dbRef listener will will be called and it will update the this.state.messages and cause app to re-render with the new message added to the list of messages)
    // 

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
    // make sure that the emoji picker is closed
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

  // grab the user's username choice for sign up
  handleSignUpUsername = (event) => {
    console.log(`username!!!!`);
    console.log(event.target.value);
    
    this.setState({
      username: event.target.value
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
    }).then(() => {
      console.log("Sign me up Scotty!");
      // after the user is created, add the chosen username to the user's account
      // this.handleSaveUserName()
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
    // make sure the settings page is closed when user logs in
    this.setState({
      settingsPageClicked: false
    })
  }

// ----- SIGN OUT -----
  handleLogOut = (event) => {
    console.log(`log out`);
    
    // when the user clicks the logout button, make sure the current anonymous user is made to be false, and that the settings page is closed
    this.setState({
      settingsPageClicked: false,
      anonymousUser: false,
      uid: "",
      username: "",
      currentUser: null
    })
    // change in user auth status fires the auth event listener
    firebase.auth().signOut().then(function () {
      // console.log("I am still logged in!!!!");
      // Sign-out successful.
      console.log("sign out successful");
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
    if (event) {
      event.preventDefault();
    }
    
    const user = firebase.auth().currentUser;
    // const userName = user.displayName;
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
      // username: '',
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

  // GUEST USER
  // fxn to login as a guest into guest chat room
  handleGuestButtonClick = () => {
    // console.log(`I am a guest let me in!`);
    this.setState({
      anonymousUser: true
    }, function() {
        firebase.auth().signInAnonymously().catch(function (error) {
          // Handle Errors here.
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;
          // ...
        })
    } )
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
    let hours = new Date().getHours(); //Current Hours
    let min = new Date().getMinutes(); //Current Minutes
    let sec = new Date().getSeconds(); //Current Seconds

    // make sure minutes has 2 numbers (i.e. if just 2, need to make 02)
    if (min.toString().length === 1) {
      min = `0${min.toString()}`
    }

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
    const timeHour = timeNormal[timeIndex];
    // i.e. have: 14 22 31
    // need: 2:22

    // get the AM or PM
    // 24:00/00:00 - 11:59 is AM & 12:00 - 23:59
  

    // final time stamep
    const timeActual = `${timeHour}:${min}`;

    // ******** EASIER METHOD ************ //
    const date = new Date()
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    const time = new Intl.DateTimeFormat('en-US', options).format(date)
    // console.log(time)

    // ---------------------------
    // The final date and time stamp
    // use: dateFull & timeActual
    // ---------------------------

    // save the date and time in state (will be grabbed and attached to "message" when user clicks submit button)
    // this.setState({
    //   date: dateFull,
    //   time: timeActual
    // })

    this.setState({
      date: dateFull,
      time: time
    })
  }

  // when the user clicks on the hamburger icon the settings menu will appear, or will disappear (in the main)
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
    // console.log(newTemporaryUserInput);
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
        <div className="wrapperMain">
          <div className="sideOne">
            <Aside 
            passUser={this.state.username}/>
          </div>
          <div className="sideTwo">
            <Header
            headerChange={this.state.currentUser}
            handleSettingsClick={this.handleSettingsClick}/>
            <main>
              {/* first conditional: if the user variable in state is null, user is not logged in, in this case render the signup/login page
              if the user variable holds the current user object from firebase, the user is logged in, in this case render the MAIN page */}
              {this.state.currentUser === null 
  
              ? 
  
              <SignUpLogIn 
              usernameSignUp={this.handleSignUpUsername}
              emailSignUp={this.handleSignUpEmail}
              passwordSignUp={this.hanldeSignUpPassword}
              onButtonClickSignUp={this.handleSignUpSubmit}
              emailSignIn={this.handleSignInEmail}
              passwordSignIn={this.hanldeSignInPassword}
              onButtonClickSignIn={this.handleSignInSubmit}
              onButtonClickGuest={this.handleGuestButtonClick}/>
  
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
                  messageColor={this.state.theme.messageColor}
                  scrollToLastMessage={this.state.scrollToLastMessage} 
                  />
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
        </div>
      </div>
    );
  }
}

export default App;
