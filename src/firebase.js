// import firebase from node modules
import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDbV1S2623FseOXa7X5Y3cRuUBY8Xx_Uv8",
    authDomain: "chat-app-26edb.firebaseapp.com",
    databaseURL: "https://chat-app-26edb.firebaseio.com",
    projectId: "chat-app-26edb",
    storageBucket: "chat-app-26edb.appspot.com",
    messagingSenderId: "1057627994740",
    appId: "1:1057627994740:web:77d4d8bb6632df674fef21"
};
// Initialize Firebase using the config
firebase.initializeApp(firebaseConfig);

export default firebase;