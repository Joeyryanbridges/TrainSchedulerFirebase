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
  var currentTime = moment().format();
  
    //Logging the current time-Working!
    console.log("Current Time: " + currentTime);
   
$("click-button").on("click", function() {
    event.preventDefault(); 

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
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    //clearing the inputs
    $("#trainNameForm").val("");
    $("#destinationForm").val("");
    $("#trainTimeForm").val("");
    $("#frequencyForm").val("");   
});

//creating firebase event for adding new train to database 
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var child = childSnapshot.val();
    $("#table-name").append(child.train+ "<br>");
    $("#table-destination").append(child.destination+ "<br>");
    $("#table-nextArrival").append(child.first + "<br>");
    $("#table-frequencyForm").append(child.frequency + "<br>"); 

    //variable to figure converted train time
    var trainTimeConverted = moment(trainTimeForm, "HH:mm");

    //declaring a time difference variable
    var timeDifference = moment().diff(moment(trainTimeConverted), "minutes"); 
        console.log(timeDifference);

    var frequencyMinutes = childSnapshot.val().frequency;
        console.log("Frequency Minutes: " + frequencyMinutes);
    
    var minutesAway = Math.abs(timeDifference % frequencyMinutes);
        console.log("Minutes Away: " + minutesAway);
    
    var nextArrival = moment(currentTime).add(minutesAway, "minutes").format("hh:mm A");
        console.log("Next Arrival: " + nextArrival); 
        
    //adding into table
    $("#trainScheduleTable > tbody").append("<tr><td>" + trainName + "<tr><td>" + trainDestination + "<tr><td>" + trainFrequency + "<tr><td>" + nextArrival + "<tr><td>" + minutesAway + "<tr><td>");
});
