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

    if (trainName == "" || destination =="" || firstTrainTime == "" || trainFrequency =="") {
        alert("All fields are required. Please fill the entire form.");

    }

    else{

    // test
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(trainFrequency);

    // first train time converted to military time and pushed back 1 year so it comes before the current time
    var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log("the first train time is:" + firstTrainTimeConverted);

    // difference between the times in minutes
    var timeDifference = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log("time difference:" + timeDifference);

    // time apart between train time and current time
    var timeApart = timeDifference % trainFrequency;
    console.log(timeApart);

    // how many minutes until next train
    var minutesTilNextTrain = trainFrequency - timeApart;
    console.log("how long until next train:" + minutesTilNextTrain);

    // next train will arrive at this time in minutes
    var nextTrain = moment().add(minutesTilNextTrain, "minutes");
    console.log("next train will arrive:" + nextTrain);

    // next train will arrive at this time in hour format and AM/PM
    var arrivalTime = moment(nextTrain).format("hh:mm A");
    console.log("this is the final time:" + arrivalTime);



    // upload the user-input values to the database
    database.ref().push({
        name: trainName,
        destination: destination,
        next: arrivalTime,
        minutesAway: minutesTilNextTrain,
        frequency: trainFrequency
    });

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