$(document).ready(function(){

// initialize Firebase
var config = {
    apiKey: "AIzaSyAxSpkD_VEUOHcxmsSwRkD9x_-EK8mMLro",
    authDomain: "train-scheduler-79a71.firebaseapp.com",
    databaseURL: "https://train-scheduler-79a71.firebaseio.com",
    projectId: "train-scheduler-79a71",
    storageBucket: "train-scheduler-79a71.appspot.com",
    messagingSenderId: "770731075832"
};

firebase.initializeApp(config);

var database = firebase.database();

// global variables
var trainName = "";
var destination = "";
var firstTrainTime = "";
var trainFrequency = "";

// when the user clicks on the submit button...
$("#submit-button").on("click", function(event){

    // prevent the button from refreshing the page
    event.preventDefault();

    // store the user input values without any extra spaces
    trainName = $("#train-name").val().trim();
    destination = $("#train-destination").val().trim();
    firstTrainTime = $("#train-time").val().trim();
    trainFrequency = $("#train-frequency").val().trim();

    // test
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(trainFrequency);

    // upload the user-input values to the database
    database.ref().push({
        name: trainName,
        destination: destination,
        time: firstTrainTime,
        frequency: trainFrequency
    });

    // clear the input forms for the next train to be added
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#train-frequency").val("");

});


// event to add trains to the firebase database and display them on screen
database.ref().on("child_added", function(snapshot){

    // storing the snapshot.val() in a variable for convenience - snapshotValue
    var sv = snapshot.val();
    
    // create a new row to hold the values from the database
    var newRow = $("<tr>").append(
        $("<td>").text(sv.name),
        $("<td>").text(sv.destination),
        $("<td>").text(sv.frequency),
        $("<td>").text(sv.time),
        $("<td>").text(sv.time)
    );

    // display the new row under their respective columns
    $("#schedule-table").append(newRow);

    

});


});