// Chat functionality

// Initialize Firebase
 var config = {
    apiKey: "AIzaSyCMdb9HnMtLOcvaQJ-bq17qaL334F-z2F0",
    authDomain: "chatapp-789b7.firebaseapp.com",
    databaseURL: "https://chatapp-789b7.firebaseio.com",
    projectId: "chatapp-789b7",
    storageBucket: "chatapp-789b7.appspot.com",
    messagingSenderId: "689750612225"
 };

 // Initialize Firebase
 firebase.initializeApp(config);


//default document state when user not signed in.
 $(document).ready(function () {
     $("#userSignIn").show();
     $("#userSignOut").hide();

     //user name display
     $("#userWelcome").hide();




 });

//will display signout button when user is logged in.
 function userOutLink() {

     $("#userSignIn").hide();
     $("#userSignOut").show();

     //user name display
     $("#userWelcome").show();
     $("#userWelcome").append( user.displayName );
     //$("#userWelcome").html("Welcome, " + user.displayName);

     $("#Logo").hide();


 };

//will display signout button when user is NOT logged in.
 function userInLink() {

     $("#userSignIn").show();
     $("#userSignOut").hide();

     $("#Logo").show();


 };

//logs user out when signout is clicked
function signOut () {

firebase.auth().signOut()
location.reload();


};

//redirects user to login page.
function signIn () {

    //variable for auth call to google.
     var userAuth = new firebase.auth.GoogleAuthProvider();

    //function to call authentication and show popup login
     firebase.auth().signInWithPopup(userAuth).then(function (result) {
         // This gives you a Google Access Token. You can use it to access the Google API.
         var token = result.credential.accessToken;
         // The signed-in user info.
         user = result.user;

     }).catch(function (error) {
         // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;
         // The email of the user's account used.
         var email = error.email;
         // The firebase.auth.AuthCredential type that was used.
         var credential = error.credential;

     });

    /* if code breaks use "$(location).attr('href', 'auth.html')" to redirect to standalone login page*/

};

 //checks for user user then calls a function
 firebase.auth().onAuthStateChanged(function (user) {
     if (user) {
         userOutLink();
         console.log(user.displayName);
     } else {
         userInLink();
         console.log("user off");
     }
 });



//Firebase Post
 function submitClick() {

     //calls newMessage div from index.html
     var newMessage = document.getElementById("newMessage").value;

     //gets user.
     var user = firebase.auth().currentUser;
     var name = user.displayName;

     //timestamp
     var stamp = $.now();

     //select messages from database.
     var fbRef = firebase.database().ref("messages");

     // store data to messages DB
     fbRef.push().set({
       poster: name + " says: " + newMessage,
       time: stamp});

     //fbRef.push().set( name  + " says: " + newMessage);

     //clear input
     $('#newMessage').val('');
   };

   //message output
    var fbRead = firebase.database().ref('messages');

/*
    fbRead.on("value", function(snapshot) {
      snapshot.forEach( function(childSnapshot) {

*/


fbRead.on('child_added', function (childSnapshot) {

        var childData = childSnapshot.val();
        var poster=childData.poster;

        //test if data is pulled
        console.log(childData.poster);

        //output data
        $("#msgOut").append( childData.poster + "<br/>")


 });



    //message getter
    //var SubmitButton = document.getElementById("SubmitButton");
