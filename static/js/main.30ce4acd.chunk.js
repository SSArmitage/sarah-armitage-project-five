(this["webpackJsonpsarah-armitage-project-five"]=this["webpackJsonpsarah-armitage-project-five"]||[]).push([[0],{33:function(e,t,a){e.exports=a(85)},38:function(e,t,a){},39:function(e,t,a){},85:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),r=a(28),i=a.n(r),l=(a(38),a(4)),c=a(5),o=a(7),u=a(6),m=a(8),d=(a(39),a(18)),p=a.n(d);p.a.initializeApp({apiKey:"AIzaSyDbV1S2623FseOXa7X5Y3cRuUBY8Xx_Uv8",authDomain:"chat-app-26edb.firebaseapp.com",databaseURL:"https://chat-app-26edb.firebaseio.com",projectId:"chat-app-26edb",storageBucket:"chat-app-26edb.appspot.com",messagingSenderId:"1057627994740",appId:"1:1057627994740:web:77d4d8bb6632df674fef21"});var h=p.a,g=function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"settings"},s.a.createElement("div",{className:"wrapper flexContainer"},s.a.createElement("div",{className:"settingsFormContainer"},s.a.createElement("h2",null,"Settings"),s.a.createElement("ul",null,s.a.createElement("li",null,s.a.createElement("form",{onSubmit:this.props.onButtonClickUserName},s.a.createElement("h3",null,"Add/Change Username"),s.a.createElement("input",{id:"username",type:"text",value:this.props.username,onChange:this.props.userName}),s.a.createElement("button",null,"Save"))),s.a.createElement("button",{onClick:this.props.logOut},"Log Out")))))}}]),t}(n.Component),f=function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,!1===this.props.userChange?s.a.createElement("header",{className:"headerSignedOutPage"},s.a.createElement("div",{className:"wrapper flexContainer"},s.a.createElement("h1",null,"Chat App"),s.a.createElement("div",{className:"iconContainer",onClick:this.props.handleSettingsClick},s.a.createElement("i",{class:"fas fa-bars"})))):s.a.createElement("header",{className:"headerSignedInPage"},s.a.createElement("div",{className:"wrapper flexContainer"},s.a.createElement("h1",null,"Chat App"),s.a.createElement("div",{className:"iconContainer",onClick:this.props.handleSettingsClick},s.a.createElement("i",{class:"fas fa-bars"})))))}}]),t}(n.Component),E=function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("footer",null,s.a.createElement("div",{className:"wrapper flexContainer"},s.a.createElement("p",null,"Copyright Sarah Armitage 2019")))}}]),t}(n.Component),b=a(32),S=a(30),C=a.n(S),v="",j=function(e){var t=Object(n.useState)(null),a=Object(b.a)(t,2),r=a[0],i=a[1];return s.a.createElement("div",null,r?s.a.createElement("span",null,"You chose: ",r.emoji):s.a.createElement("span",null,"No emoji Chosen"),s.a.createElement(C.a,{onEmojiClick:function(t,a){t.preventDefault(),i(a),v=a.emoji,e.handleEmojiClick(t,v)}}))},k=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(o.a)(this,Object(u.a)(t).call(this))).enterFunction=function(e){13===e.keyCode&&(e.preventDefault(),console.log("Pressed enter"),console.log(e),document.getElementById("clickSend").click())},e.getChosenEmoji=function(t,a){e.props.sendEmojiIntoApp(a),e.textInput.current.focus()},e.textInput=s.a.createRef(),e.state={selectedEmoji:""},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("keypress",this.enterFunction,!1)}},{key:"render",value:function(){return s.a.createElement("div",{className:"sendMessageArea"},s.a.createElement("div",{className:"wrapper flexContainer"},s.a.createElement("form",{onSubmit:this.props.onButtonClick},s.a.createElement("label",{htmlFor:"userMessage"}),s.a.createElement("textarea",{rows:"10",cols:"40",placeholder:"Enter message here",id:"userMessage",onChange:this.props.onTextInput,value:this.props.textInputValue,ref:this.textInput}),s.a.createElement("div",{className:"sendAndEmojiContainer"},s.a.createElement("button",{className:"emojiIcon",onClick:this.props.onEmojiClick},s.a.createElement("i",{class:"far fa-laugh"})),s.a.createElement("button",{id:"clickSend"},"Send")),this.props.showEmojiPicker?s.a.createElement("div",{className:"emojiPicker"},s.a.createElement(j,{handleEmojiClick:this.getChosenEmoji})):null)))}}]),t}(n.Component),w=a(31),N=a.n(w),O=function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e,t,a=this.props.user,n=this.props.messages;return e={backgroundColor:"blueviolet"},t={backgroundColor:"#0392cf"},s.a.createElement("div",{className:"messageArea"},s.a.createElement("div",{className:"wrapper messageListContainer"},s.a.createElement(N.a,{className:"messageBox"},n.map((function(n){return n.username===a.displayName?s.a.createElement("li",{className:"message currentUserPosition",style:e},s.a.createElement("p",{className:"userName"},n.username),s.a.createElement("p",{className:"dateAndTime"},"".concat(n.date," ").concat(n.time)),s.a.createElement("p",{className:"messageText"},n.text)):s.a.createElement("li",{className:"message",style:t},s.a.createElement("p",{className:"userName"},n.username),s.a.createElement("p",{className:"dateAndTime"},"".concat(n.date," ").concat(n.time)),s.a.createElement("p",{className:"messageText"},n.text))})))))}}]),t}(n.Component),I=function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"wrapper"},s.a.createElement("div",{className:"notSingedInPage"},s.a.createElement("form",{className:"signUp",onSubmit:this.props.onButtonClickSignUp},s.a.createElement("h2",null,"Sign Up"),s.a.createElement("label",{htmlFor:"email"},"Email Address:"),s.a.createElement("input",{type:"email",id:"email",placeholder:"Email address",onChange:this.props.emailSignUp,required:!0}),s.a.createElement("label",{htmlFor:"password"},"Password:"),s.a.createElement("input",{type:"password",id:"password",placeholder:"Password",onChange:this.props.passwordSignUp,required:!0,title:"8 characters minimum"}),s.a.createElement("button",null,"Sign Up")),s.a.createElement("form",{className:"login",onSubmit:this.props.onButtonClickSignIn},s.a.createElement("h2",null,"Sign In"),s.a.createElement("label",{htmlFor:"email"},"Email Address:"),s.a.createElement("input",{type:"email",id:"email",placeholder:"Email address",onChange:this.props.emailSignIn,required:!0}),s.a.createElement("label",{htmlFor:"password"},"Password:"),s.a.createElement("input",{type:"password",id:"password",placeholder:"Password",onChange:this.props.passwordSignIn,required:!0}),s.a.createElement("button",null,"Sign In"))))}}]),t}(n.Component),U=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(o.a)(this,Object(u.a)(t).call(this))).handleChange=function(t){e.setState({userInput:t.target.value}),e.getDateAndTime(),e.setState({showEmojiPicker:!1})},e.handleSubmit=function(t){console.log(t),e.setState({showEmojiPicker:!1}),t.preventDefault();var a=h.database().ref("messages"),n=h.database().ref("userSpecificMessages"),s=[];Object.assign(s,e.state.messages);var r=[];Object.assign(r,e.state.userSpecificMessages);var i={username:e.state.currentUser.displayName,userId:e.state.currentUser.uid,text:e.state.userInput,date:e.state.date,time:e.state.time};""!==i.text&&(s.length<100?(s.push(i),r.push(i)):(s.shift(),r.shift(),s.push(i),r.push(i))),a.set(s),n.set(r),e.setState({userInput:"",date:"",time:""})},e.handleSignUpEmail=function(t){e.setState({email:t.target.value})},e.hanldeSignUpPassword=function(t){e.setState({password:t.target.value})},e.handleSignUpSubmit=function(t){t.preventDefault(),e.state.password.length<6&&alert("Your password must be 6 characters or longer"),h.auth().createUserWithEmailAndPassword(e.state.email,e.state.password).catch((function(e){}))},e.handleSignInEmail=function(t){e.setState({email:t.target.value})},e.hanldeSignInPassword=function(t){e.setState({password:t.target.value})},e.handleSignInSubmit=function(t){t.preventDefault(),h.auth().signInWithEmailAndPassword(e.state.email,e.state.password).catch((function(e){e.code,e.message;alert("You have entered either an incorrect email or password")})),e.setState({settingsPageClicked:!1})},e.handleLogOut=function(e){h.auth().signOut().then((function(){})).catch((function(e){}))},e.handleUserName=function(t){e.setState({username:t.target.value})},e.handleSaveUserName=function(t){t.preventDefault();var a=h.auth().currentUser;a.displayName;a.updateProfile({displayName:e.state.username}).then((function(){a.displayName})).then((function(){e.updateUserNameInDB()})).catch((function(e){})),e.setState({username:"",settingsPageClicked:!e.state.settingsPageClicked})},e.updateUserNameInDB=function(){var t=h.database().ref("messages"),a=[];Object.assign(a,e.state.messages),a.forEach((function(t){t.userId===e.state.currentUser.uid&&(t.username=e.state.currentUser.displayName)})),t.set(a)},e.handleThemeColorChange=function(t){e.setState({theme:{messageColor:t.target.value}});var a=e.state.currentUser.uid;h.database().ref().child("users").child(a).set({themeColor:"".concat(e.state.theme.messageColor)})},e.getDateAndTime=function(){for(var t=(new Date).getDate(),a=(new Date).getMonth(),n=(new Date).getFullYear(),s="".concat(["January","February","March","April","May","June","July","August","September","October","November","December"][a]," ").concat(t,", ").concat(n),r=(new Date).getHours(),i=(new Date).getMinutes(),l=((new Date).getSeconds(),[]),c=0;c<=24;c++)l.push(c);for(var o=[],u=1;u<=2;u++)for(var m=1;m<=12;m++)o.push(m);o.unshift(12);var d=o[l.indexOf(r)],p="".concat(d,":").concat(i);e.setState({date:s,time:p})},e.handleSettingsClick=function(){e.setState({settingsPageClicked:!e.state.settingsPageClicked})},e.handleEmojiClick=function(t){t.preventDefault();var a=!e.state.showEmojiPicker;e.setState({showEmojiPicker:a})},e.hanldleColorChange=function(e){},e.handleEmojiSelection=function(t){console.log(t);var a=e.state.userInput,n="".concat(a).concat(t);console.log(n),e.setState({userInput:n})},e.state={messages:[],userSpecificMessages:[],messagesFiltered:[],userInput:"",tempUserInput:"",currentUser:null,username:"",uid:"",email:"",password:"",settingsPageClicked:!0,selectedColorOption:"",theme:{messageColor:""},date:"",time:"",userComputer:"",showEmojiPicker:!1,userSignedIn:!1,selectedEmoji:"",emojiString:""},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=h.database().ref("messages");h.database().ref("userSpecificMessages");t.on("value",(function(t){var a=t.val();e.setState({messages:a})})),h.auth().onAuthStateChanged((function(t){if(t?e.setState({currentUser:t,uid:t.uid}):e.setState({currentUser:null}),null!=h.auth().currentUser)t.displayName,t.email,t.photoURL,t.emailVerified,t.uid}))}},{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement(f,{headerChange:this.state.currentUser,handleSettingsClick:this.handleSettingsClick}),s.a.createElement("main",null,null===this.state.currentUser?s.a.createElement(I,{emailSignUp:this.handleSignUpEmail,passwordSignUp:this.hanldeSignUpPassword,onButtonClickSignUp:this.handleSignUpSubmit,emailSignIn:this.handleSignInEmail,passwordSignIn:this.hanldeSignInPassword,onButtonClickSignIn:this.handleSignInSubmit}):!0===this.state.settingsPageClicked?s.a.createElement(g,{username:this.state.username,userName:this.handleUserName,onButtonClickUserName:this.handleSaveUserName,selectedColorOption:this.state.selectedColorOption,handleColorChange:this.handleColorChange,logOut:this.handleLogOut}):s.a.createElement("div",{className:"content"},s.a.createElement(O,{user:this.state.currentUser,messages:this.state.messages,messagesUSM:this.state.userSpecificMessages,messageColor:this.state.theme.messageColor}),s.a.createElement(k,{onTextInput:this.handleChange,textInputValue:this.state.userInput,onEmojiClick:this.handleEmojiClick,showEmojiPicker:this.state.showEmojiPicker,onButtonClick:this.handleSubmit,sendEmojiIntoApp:this.handleEmojiSelection}))),s.a.createElement(E,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(U,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[33,1,2]]]);
//# sourceMappingURL=main.30ce4acd.chunk.js.map