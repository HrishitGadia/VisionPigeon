// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBnEq5PItQhk1tt67ysK_DsrCT3cQIqnRI",
  authDomain: "hrishit-gadia.firebaseapp.com",
  databaseURL: "https://hrishit-gadia-default-rtdb.firebaseio.com",
  projectId: "hrishit-gadia",
  storageBucket: "hrishit-gadia.appspot.com",
  messagingSenderId: "587509759577",
  appId: "1:587509759577:web:5dbbb8b8cb7d3f6e6dbb48"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function 
function register() {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  gender = document.getElementById('gender').value
  animal = document.getElementById('animal').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false || validate_field(gender) == false || validate_field(animal) == false) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }

  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser

      // Add this user to Firebase Database
      var database_ref = database.ref()

      // Create User data
      var user_data = {
        email: email,
        full_name: full_name,
        gender: gender,
        animal: animal,
        last_login: Date.now()
      }

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
      firebase.database().ref('users/' +user.uid).set({
       user_data
      });

      // DOne
      alert('User Created!!')
      localStorage.setItem('User Id', user.uid);
      localStorage.setItem('User Name', full_name);
      document.getElementById("hideit").style.display = "none";
      document.getElementById("showit").style.display = "block";
    })//.then(function () {
      //window.location = "Home.html";
   // })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })
}

// Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById('email').value
  full_name = document.getElementById('full_name').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser

      // Add this user to Firebase Database
      var database_ref = database.ref()

      // Create User data
      var user_data = {
        last_login: Date.now()
      }

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
      firebase.database().ref('users/' +user.uid).update({
        user_data
       });

      // DOne
      alert('User Logged In!!')
      localStorage.setItem('User Name', full_name);
      localStorage.setItem('User Id', user.uid)
      document.getElementById("hideit").style.display = "none";
      document.getElementById("showit").style.display = "block";
      

    })//.then(function () {
      //window.location = "Home.html";
    //})
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}

function Switch(){
  window.location = "Home.html";
}