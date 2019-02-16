const firebase = require('firebase-functions');
var config = {
    apiKey: "AIzaSyCNwVwibl12fo73OrZH4hQ9QC8LPvWkOIo",
    authDomain: "classrecordsystem-f6067.firebaseapp.com",
    databaseURL: "https://classrecordsystem-f6067.firebaseio.com",
    projectId: "classrecordsystem-f6067",
    storageBucket: "classrecordsystem-f6067.appspot.com",
    messagingSenderId: "345531015638"
  };
const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
db.settings({timestampsInSnapshots: true})

db.collection("studentClasses").onSnapshot(function(querySnapshot) {
    console.log(querySnapshot);  
});
