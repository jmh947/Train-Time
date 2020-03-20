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
  var trainArrival = $("#arrival-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

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
  $("#arrival-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
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

  // 08:00    09:06   66 / freq 30  8  83:30 9:00   6   30-6 = 24  9:06 + 24 = 9:30
var currentTime = moment()

var firstTrain = moment(trainArrival, "HH:mm")

var difMinutes= currentTime.diff(firstTrain, "minutes")

console.log("difmin:", difMinutes)

var minRemain = difMinutes % trainFrequency 

console.log("minR", minRemain)

var minutesAway = trainFrequency - minRemain
var nextTrain = currentTime.add(minutesAway, "minutes").format("HH:mm")

  /// first train in the morning   /  30 freq

  // current -  first train (minutes )   // if you divede the minute / freq  - remain 
  // freq - remain === will be minutes away 
  // next trai  current time + minutes away

  // // Prettify the train start
  // var trainFrequencyPretty = moment.unix(trainArrival).format("HH:mm");

  // // Calculate the train time using hardcore math////////////////*
  // // To calculate the train frequency
  // var trainArrival = moment().diff(moment(trainArrival, "X"), "minutes");
  // console.log(trainArrival);

  // // Calculate the total time///////////////*
  // var trainMins = trainArrival + trainFrequency;
  // console.log(trainMins);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minutesAway)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});


// Commented CSS
//background-image: url(/Users/jaclynhardy/Documents/Bootcamp/Projects/Train-Time/assets/images/imagecropped.png);
// background-size: cover;
// background-repeat: no-repeat;