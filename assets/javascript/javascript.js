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
    var trainNameForm = ("#trainNameForm").val().trim(); 
    var destinationForm = ("#destinationForm").val().trim();
    //Tracking time 
    var trainTimeForm = moment($("#trainTimeForm").val().trim(), "HH:mm").format("HH:mm");
    var frequencyForm = ("#frequencyForm").val().trim();
    //creating local "temporary" objects for holding inputs
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
    $("destinationForm").val("");
    $("#trainTimeForm").val("");
    $("#frequencyForm").val("");
});

//creating firebase event for adding new train to database and a row in HTML when user adds entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    //storing everything into a variable
    var trainName = childSnapshot.val().train; 
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().first;
    var trainFrequency = chilsSnapshot.val().frequency;

    //variable to figure converted train time
    var trainTimeConverted = moment(trainTime, "HH:mm");

    //declaring a time difference variable
    var timeDifference = moment().diff(moment(trainTimeConverted), "minutes"); 
        console.log(timeDifference);
});


