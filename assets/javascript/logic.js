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

    // check to see there are no empty input fields, if there is at least one empty one, then alert the user
    // and this prevents running the rest of the code without the proper input necessary to run the code
    if (trainName == "" || destination =="" || firstTrainTime == "" || trainFrequency =="") {
        alert("All fields are required. Please fill the entire form.");

    }

    // if there are no empty fields, then continue and run the rest of the code and calculations
    else {

    // first train time converted to military time and pushed back 1 year so it comes before the current time
    var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");

    // difference between the times in minutes (then and now)
    var timeDifference = moment().diff(moment(firstTrainTimeConverted), "minutes");

    // time apart between train time and current time by finding the remainder
    var timeApart = timeDifference % trainFrequency;

    // how many minutes until next train
    var minutesTilNextTrain = trainFrequency - timeApart;

    // next train will arrive at this time in minutes
    var nextTrain = moment().add(minutesTilNextTrain, "minutes");

    // next train will arrive at this time in hour format and AM/PM
    var arrivalTime = moment(nextTrain).format("hh:mm A");

    // upload the user-input values (after calculations) to the firebase database
    database.ref().push({
        name: trainName,
        destination: destination,
        next: arrivalTime,
        minutesAway: minutesTilNextTrain,
        frequency: trainFrequency
    });

    // alert the user that they have successfully added the train to the schedule
    alert("Train successfully added!");

    // clear the input forms for the next train to be added
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#train-frequency").val("");

    }

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
        $("<td>").text(sv.next),
        $("<td>").text(sv.minutesAway)
    );

    // display the new row under their respective columns
    $("#schedule-table").append(newRow);

    });

});