  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA7JsGew_Vy3hGnM2FIXJlrcpHhw0rNIF0",
    authDomain: "trainschedulefirebase.firebaseapp.com",
    databaseURL: "https://trainschedulefirebase.firebaseio.com",
    projectId: "trainschedulefirebase",
    storageBucket: "trainschedulefirebase.appspot.com",
    messagingSenderId: "649916968242"
  };
  firebase.initializeApp(config);

  //Variable to reference database
  var database = firebase.database();

  //Declare current time
  var currentTime = moment().format("HH:MM");
    console.log(currentTime);
    //Logging the current time-Working!
    console.log("Current Time: " + currentTime);
   
$("#click-button").on("click", function(e) {
    e.preventDefault(); 

    //Grabbing user input
    var trainNameForm = $("#trainNameForm").val().trim(); 
    var destinationForm = $("#destinationForm").val().trim();

    //Tracking time 
    var trainTimeForm = moment($("#trainTimeForm").val().trim(), "HH:mm").format("HH:mm");
    var frequencyForm = $("#frequencyForm").val().trim();

    // temp objects for holding inputs
    var newTrain = {
        train: trainNameForm,
        destination: destinationForm,
        first: trainTimeForm,
        frequency: frequencyForm,
    };
    //setting new values in the database
    database.ref().push(newTrain);

    //console logging to make sure the new data has been stored to database

    //clearing the inputs
    $("#trainNameForm").val("");
    $("#destinationForm").val("");
    $("#trainTimeForm").val("");
    $("#frequencyForm").val("");   
});

//creating firebase event for adding new train to database 
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var child = childSnapshot.val();


    //variable to figure converted train time

    var trainStart = childSnapshot.val().first;  

    var trainTimeConverted = moment(trainStart, ":mm");
        console.log(trainTimeConverted);
    //declaring a time difference variable
    var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");   

    var frequencyMinutes = childSnapshot.val().frequency;

    var remainder = timeDifference % frequencyMinutes;
    
    var minutesAway = frequencyMinutes - remainder;
        console.log(minutesAway);

    var nextTrain = moment().add(minutesAway, "minutes");    

    var nextArrival = moment(nextTrain).format("HH:mm");
        console.log(nextArrival);

    $("#table-name").append(child.train + "<br>");
    $("#table-destination").append(child.destination+ "<br>");
    $("#table-nextArrival").append(child.first + "<br>");
    $("#table-frequencyForm").append(child.frequency + "<br>"); 
    $("#table-minutesAway").append(minutesAway + "<br>");
   
});
