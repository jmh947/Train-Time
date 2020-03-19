// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains- then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the frequency. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB9JlngwnsmOPBn1zDu2k5-U1_mgyO8Ml4",
    authDomain: "hogwarts-express-934.firebaseapp.com",
    databaseURL: "https://hogwarts-express-934.firebaseio.com",
    projectId: "hogwarts-express-934",
    storageBucket: "hogwarts-express-934.appspot.com",
    messagingSenderId: "118071542840",
    appId: "1:118071542840:web:86c743aa888a3d8ccc92cd",
    measurementId: "G-VPHNBL7S6X"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();


var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFrequency = moment($("#frequency-input").val().trim(), "HH:mm").format("X");
  var trainArrival = $("#arrival-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestination ,
    frequency: trainFrequency,
    arrival: trainArrival,
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.arrival);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#arrival-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFrequency = childSnapshot.val().frequency;
  var trainArrival = childSnapshot.val().arrival;

  // Employee Info
  console.log(trainName);
  console.log(trainDestination );
  console.log(trainFrequency);
  console.log(trainArrival);

  // Prettify the employee start
  var trainFrequencyPretty = moment.unix(trainFrequency).format("HH:mm");

  // Calculate the train time using hardcore math////////////////*
  // To calculate the train frequency
  var trainFrequency = moment().diff(moment(trainFrequency, "X"), "minutes");
  console.log(trainFrequency);

  // Calculate the total billed rate///////////////*
  var empBilled = empMonths * trainArrival;
  console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequencyPretty),
    //$("<td>").text(empMonths),
    $("<td>").text(trainArrival),
    //$("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

