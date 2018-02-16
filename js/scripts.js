
var config = {
    apiKey: "AIzaSyA2hWPHVN20wZ7mP0tf4S1v2LwdjyI0oi4",
    authDomain: "serio-niesamowity-projekt.firebaseapp.com",
    databaseURL: "https://serio-niesamowity-projekt.firebaseio.com/",
    storageBucket: "serio-niesamowity-projekt.appspot.com"
};

//Initialize Firebase app
firebase.initializeApp(config);


//ADDING OBJECTS TO DATABASE

//Get reference to the recommendations object with Firebase
var recommendations = firebase.database().ref('recommendations');

//Save new recommendation to the database using input form
var submitRecommendation = function() {

    //Get input values from each of the form elements
    var title = $('#talkTitle').val();
    var presenter = $('#talkPresenter').val();
    var link = $('#talkLink').val();

    //Push a new recommendation to the database using written values
    recommendations.push ({
        'title' : title,
        'presenter' : presenter,
        'link' : link
    });
};


//READING OBJECTS FROM DATABASE

recommendations.on('child_added', function(childSnapshot) {
    //Get the recommendation data from the most recent snapshot of dat added to the recommendations list in Firebase
    recommendation = childSnapshot.val();
  
    //Append new row 
    $('#table_body').append('<tr><td>' + recommendation.title + '</td><td>'+ recommendation.presenter +'</td><td id="link">' + recommendation.link + '</td><td><button class="delete_btn btn btn-default">x</button></td></tr>');

    //Make the link actually work and direct to the URL provided
    $('#link').attr("href", recommendation.link);
});

//Remove specific object from database using button
$('.btn').click( function() {
    //patent1
    //firebase.database().ref().child('recommendations/').remove();
    //console.log('klik');

    //patent2
    //recommendations.on('child_added', function (snapshot) {
    //    snapshot.ref.remove();
    //});

    console.log('klik');

});


//HOSTING FILES

//Get elements for hosting files 
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

//Listen for file selection
fileButton.addEventListener('change', function(e) {
    
    //Get a file first
    var file = e.target.files[0];
    
    //Then create a storage reference
    var storageRef = firebase.storage().ref('text_files/' + file.name);

    //Upload file
    var task = storageRef.put(file);
    
    //Update progress bar
    task.on('state_changed', 
        function progress(snapshot){
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
            uploader.value = percentage;
        },

        function error(err) {
    
        },

        function complete() {

        }
    );
});


//Call function only when window is fully loaded
$(window).load(function () {

    //Find the HTML element with id recommendationForm, and when submit event is triggeredr on that element, call submitRecommendation
    $('#recommendationForm').submit(submitRecommendation);
    
});
