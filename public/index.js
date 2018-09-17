firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
        
  
      var user = firebase.auth().currentUser;
      //  var userId = user.uid;
      var cashierNumber;
      ReactDOM.render(
        <Dashbaord/>,
        document.querySelector("#app")
    )
      
    } else {
        ReactDOM.render(
            <Login/>,
            document.querySelector("#app")
        )
    }
  });
  function login() {
    var userEmail = document.getElementById("email").value;
    var userPass = document.getElementById("password").value;
  
    firebase
      .auth()
      .signInWithEmailAndPassword(userEmail, userPass)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
        // ...
      });
  }
  
  function logout() {
    firebase.auth().signOut();
    console.log("logout");
  }
  