(this["webpackJsonpsarah-armitage-project-five"]=this["webpackJsonpsarah-armitage-project-five"]||[]).push([[0],{18:function(e,t,a){e.exports=a(35)},23:function(e,t,a){},24:function(e,t,a){},35:function(e,t,a){"use strict";a.r(t);var n=a(1),o=a.n(n),s=a(15),l=a.n(s),r=(a(23),a(17)),i=a(4),c=a(5),u=a(7),m=a(6),h=a(8),p=(a(24),a(12)),g=a.n(p);g.a.initializeApp({apiKey:"AIzaSyDbV1S2623FseOXa7X5Y3cRuUBY8Xx_Uv8",authDomain:"chat-app-26edb.firebaseapp.com",databaseURL:"https://chat-app-26edb.firebaseio.com",projectId:"chat-app-26edb",storageBucket:"chat-app-26edb.appspot.com",messagingSenderId:"1057627994740",appId:"1:1057627994740:web:77d4d8bb6632df674fef21"});var d=g.a,b=(n.Component,function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("header",null,o.a.createElement("div",{className:"wrapper"},o.a.createElement("h1",null,"Title"),o.a.createElement("button",{onClick:this.props.logOut},"Log Out"),o.a.createElement("form",null,o.a.createElement("label",{htmlFor:"themeColor"},"Pick Message Color Theme:"),o.a.createElement("input",{type:"color",id:"themeColor",onChange:this.props.changeThemeColor}))))}}]),t}(n.Component)),f=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("footer",null,o.a.createElement("div",{className:"wrapper"},o.a.createElement("p",null,"Copyright Sarah Armitage 2019")))}}]),t}(n.Component),E=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"wrapper"},o.a.createElement("form",{onSubmit:this.props.onButtonClick},o.a.createElement("label",{htmlFor:"userMessage"}),o.a.createElement("textarea",{rows:"10",cols:"40",placeholder:"Enter message here",id:"userMessage",onChange:this.props.onTextInput,value:this.props.textInputValue}),o.a.createElement("button",null,"Send")))}}]),t}(n.Component),S=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e={borderColor:"".concat(this.props.messageColor)};return o.a.createElement("div",{className:"wrapper messageListContainer"},o.a.createElement("div",{className:"messageBox"},this.props.messages.map((function(t){return o.a.createElement("li",{className:"message",style:e},t)}))))}}]),t}(n.Component),v=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"wrapper"},o.a.createElement("div",{className:"notSingedInPage"},o.a.createElement("h2",null,"Not signed in"),o.a.createElement("form",{className:"login",onSubmit:this.props.onButtonClickSignIn},o.a.createElement("label",{htmlFor:"email"},"Email Address"),o.a.createElement("input",{type:"email",id:"email",placeholder:"Email address",onChange:this.props.emailSignIn}),o.a.createElement("label",{htmlFor:"password"},"Password"),o.a.createElement("input",{type:"password",id:"password",placeholder:"Password",onChange:this.props.passwordSignIn}),o.a.createElement("button",null,"Sign In"))))}}]),t}(n.Component),O=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).handleChange=function(t){e.setState({userInput:t.target.value})},e.handleSubmit=function(t){t.preventDefault(),console.log("clicked button");var a=d.database().ref("messages"),n=Object(r.a)(e.state.messages);console.log("cloned array",n);var o=e.state.userInput;console.log(o),""!==o?(console.log("I am not empty"),n.length<100?(console.log("there are less than 100 messages in here!"),n.push(o),console.log(n)):(n.shift(),n.push(o),console.log(n))):console.log("I am empty"),a.set(n),e.setState({userInput:""})},e.handleSignUpEmail=function(t){e.setState({email:t.target.value})},e.hanldeSignUpPassword=function(t){e.setState({password:t.target.value})},e.handleSignUpSubmit=function(t){t.preventDefault(),console.log("I clicked the button!"),d.auth().createUserWithEmailAndPassword(e.state.email,e.state.password).catch((function(e){console.log(e)}))},e.handleSignInEmail=function(t){e.setState({email:t.target.value})},e.hanldeSignInPassword=function(t){e.setState({password:t.target.value})},e.handleSignInSubmit=function(t){t.preventDefault(),console.log("I clicked the button!"),d.auth().signInWithEmailAndPassword(e.state.email,e.state.password).catch((function(e){var t=e.code,a=e.message;console.log(t,a)}))},e.handleLogOut=function(e){d.auth().signOut().then((function(){console.log("I was signed out")})).catch((function(e){console.log(e)}))},e.handleThemeColorChange=function(t){e.setState({theme:{messageColor:t.target.value}}),console.log("I picked a different color!"),console.log(t.target.value)},e.state={messages:[],userInput:"",currentUser:null,email:"",password:"",settingsPage:!1,theme:{messageColor:""}},e}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;d.database().ref("messages").on("value",(function(t){var a=t.val();console.log(a),e.setState({messages:a})})),d.auth().onAuthStateChanged((function(t){if(t?(console.log("I am logged in"),console.log(t),e.setState({currentUser:t})):(console.log("I am not logged in"),e.setState({currentUser:null})),null!=d.auth().currentUser)t.displayName,t.email,t.photoURL,t.emailVerified,t.uid}))}},{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(b,{logOut:this.handleLogOut,changeThemeColor:this.handleThemeColorChange}),o.a.createElement("main",null,null===this.state.currentUser?o.a.createElement(v,{emailSignUp:this.handleSignUpEmail,passwordSignUp:this.hanldeSignUpPassword,onButtonClickSignUp:this.handleSignUpSubmit,emailSignIn:this.handleSignInEmail,passwordSignIn:this.hanldeSignInPassword,onButtonClickSignIn:this.handleSignInSubmit}):o.a.createElement("div",{className:"content"},o.a.createElement("p",null,"signed in"),o.a.createElement(S,{messages:this.state.messages,messageColor:this.state.theme.messageColor}),o.a.createElement(E,{onTextInput:this.handleChange,textInputValue:this.state.userInput,onButtonClick:this.handleSubmit}))),o.a.createElement(f,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[18,1,2]]]);
//# sourceMappingURL=main.525c7a34.chunk.js.map