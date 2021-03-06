let _Password = "";
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    var user = firebase.auth().currentUser;
    //  var userId = user.uid;
    var cashierNumber;
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .update({ password: _Password });
    ReactDOM.render(<Dashbaord />, document.querySelector("#app"));
  } else {
    ReactDOM.render(<Login />, document.querySelector("#app"));
  }
});
function login() {
  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("password").value;
  _Password = userPass;
  firebase
    .firestore()
    .collection("users")
    .where("email", "==", userEmail)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.data().userType == "admin") {
          firebase
            .auth()
            .signInWithEmailAndPassword(userEmail, userPass)
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              window.alert("Login Error : " + errorMessage);
              // ...
            });
        } else {
          alert("Not Allowed");
        }
      });
    });
}

function logout() {
  firebase.auth().signOut();
  console.log("logout");
}
