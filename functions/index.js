const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const firestore = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createUser = functions.firestore
  .document("tempCreateUsers/{userEmail}")
  .onWrite((change, context) => {
    // ... Your code here
    console.log(change.after.data());
    let email = change.after.data().email;
    let password = change.after.data().password;

    return admin.auth().createUser({
      email: email,
      emailVerified: true,
      password: password,
      disabled: false
    });
  });

  exports.deleteUserRecord = functions.auth.user().onDelete((user) => {
    // ...
    return firestore
    .collection("tempCreateUsers")
    .doc(user.email).delete().then(()=>{
      firestore
      .collection("users")
      .doc(user.uid).delete();
    })
  });

exports.afterCreateUser = functions.auth.user().onCreate(user => {
  // ...
  var userId = user.uid;
  var email = user.email;
  console.log("user Id: " + userId + " userEmail: " + email);

  return firestore
    .collection("tempCreateUsers")
    .doc(email)
    .onSnapshot(querySnapshot => {
      let obj = querySnapshot.data()
      firestore
        .collection("users")
        .doc(userId)
        .set({
          email: email,
          userId: userId,
          userName: querySnapshot.data().userName,
          userSchoolId: querySnapshot.data().userSchoolId,
          userType: querySnapshot.data().userType,
          userImage:
            "https://firebasestorage.googleapis.com/v0/b/classrecordsystem-f6067.appspot.com/o/assets%2Favatar-1577909_960_720.png?alt=media&token=ff2ede2c-d86a-481e-87e5-384011a368ca"
        })
      if(querySnapshot.data().userType == "teacher"){
          console.log({
              accountStatus:"active",
              userId:userId,
              teacherId:querySnapshot.data().userSchoolId,
              teacherName:querySnapshot.data().userName,
          })
          firestore
          .collection("teacherProfile")
          .doc(userId)
          .set({
            accountStatus: "active",
            userId: userId,
            teacherId: querySnapshot.data().userSchoolId,
            teacherName: querySnapshot.data().userName
          });
      }else if (querySnapshot.data().userType == "student"){
        firestore.collection("studentProfile").doc(userId).set({  
          email:email,
          userId:userId,
          studentId:querySnapshot.data().studentId,
          fName:obj.fName,
          mName:obj.mName,
          lName:obj.lName,
          programKey:obj.programKey,
          sectionKey:obj.sectionKey,
          studentId:obj.studentId,
          yearLevelKey:obj.yearLevelKey,
          accountStatus:"active"
        })
        let studentClassKeyId =  firestore.collection("studentClasses").doc().id
        firestore.collection("studentClasses").doc(studentClassKeyId).set({
          classCode:obj.classCode,
          key:studentClassKeyId,
          status:"approved",
          studentId:obj.studentId,
          studentUserId:userId
        })
      }
    });
});

