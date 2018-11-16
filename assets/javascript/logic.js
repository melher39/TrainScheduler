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

$("#submit-button").on("click", function(event){

    event.preventDefault();

    trainName = $("#train-name").val().trim();
    destination = $("#train-destination").val().trim();
    firstTrainTime = $("#train-time").val().trim();
    trainFrequency = $("#train-frequency").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(trainFrequency);

    database.ref().push({
        name: trainName,
        destination: destination,
        time: firstTrainTime,
        frequency: trainFrequency
    })
    
});


});