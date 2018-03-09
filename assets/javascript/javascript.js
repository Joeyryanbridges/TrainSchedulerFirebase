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

    

});
