const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.createUser = functions.firestore
.document('tempCreateUsers/{userEmail}').onWrite((change, context) => {
  // ... Your code here
  console.log(change.after.data());
  let email = change.after.data().email;
  let userSchoolId = change.after.data().userSchoolId
  let password = change.after.data().password;

  return admin.auth().createUser({
      email: email,
      emailVerified: true,
      password: password,
      disabled: false
  })
});

exports.afterCreateUser = functions.auth.user().onCreate((user) => {
    // ...
    var userId = user.uid;
    var email = user.email;
    console.log("user Id: "+ userId+ " userEmail: "+email);
    
    return firestore.collection("tempCreateUsers").doc(email)
    .onSnapshot((querySnapshot)=>{
        firestore.collection("users").doc(userId).set({
                email:email,
                userId:userId,
                userSchoolId:querySnapshot.data().userSchoolId,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                userType:"teacher"
            })
        firestore.collection("teacherProfile").doc(userId).set({
            accountStatus:"block",
            userId:userId,
            teacherId:querySnapshot.data().userSchoolId,
            timestamp:admin.firestore.FieldValue.serverTimestamp(),
            teacherName:""
        })
    })
  
});


