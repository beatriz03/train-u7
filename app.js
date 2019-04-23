// Initialize Firebase
var config = {
    apiKey: "AIzaSyBALjDr71J1fYXke7BYrO7S1m0DFOWWOuE",
    authDomain: "train-u7.firebaseapp.com",
    databaseURL: "https://train-u7.firebaseio.com",
    projectId: "train-u7",
    storageBucket: "train-u7.appspot.com",
    messagingSenderId: "925198627950"
};

firebase.initializeApp(config);
var dataRef = firebase.database();

var trainName = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;
var nextArrival = 0;
var minutesAway = 0;

//When submit button clicked info will be added to new row
$("#addTrain").on("click", function () {
    event.preventDefault();

    trainName = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    frequency = $("#frequencyInput").val().trim();
    firstTrain = $("#firstTrainInput").val()
    nextArrival = $("#nextArrival").val();
    minutesAway = $("#minutesAway").val();


    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTrainConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
    // Minute Until Train
    var minutesAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);
    // Next Train
    var nextArrival = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("HH:mm"));




    var markup = "<tr><td>" + trainName + "</td> <td>" + destination + "</td><td>" + frequency + "</td> <td>" + nextArrival + "</td> <td>" + minutesAway + "</td></tr>";

    $("table tbody").append(markup);
});


//This will update info on Firebase side
dataRef.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    nextArrival: nextArrival,
    minutesAway: minutesAway,
});


//To display new info in console.log & add into Firebase
dataRef.ref().on("child_added", function (snapshot) {

    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().nextArrival);
    console.log(snapshot.val().minutesAway);


    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
})
