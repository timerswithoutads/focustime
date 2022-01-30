// Get the full screen button element
var fullScreenButton = document.getElementById("fullscreen");

// The function to enter full screen
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) { // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) { // iOS Safari
        element.webkitRequestFullscreen();
    }
}

// The function to exit full screen
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

// Add event listener click
fullScreenButton.addEventListener("click", function() {

    // Check if the browser is in full screen mode
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {

        // If not, enter full screen mode
        enterFullscreen(document.documentElement);

    } else {

        // If yes, exit full screen mode
        exitFullscreen();
    }
});


// Get user input with prompt
var focusTime = prompt("Wie viele Minuten möchtest du fokussieren?");

// Check if the user input is a number
if (isNaN(focusTime)) {

    // If not a number, show an error message
    alert("Bitte gib eine Zahl ein!");

    // reload the page
    location.reload();
}

// Get the current time plus [focusTime] minutes and store it to endTime
var endTime = new Date().getTime() + focusTime * 60 * 1000;

// Function to format the time
function formatTime(number) {

    // If the number is not 2 digits, add a 0 in front
    if (number.toString().length <= 1) {

        // Add a 0 in front
        number = "0" + number;
    }

    // return the formatted number
    return number;
}


// Loop through the time until the endTime every 0,1 second
var timer = setInterval(function() {

    // Get the current time
    var currentTime = new Date();

    // Calculate the difference between the current time and the endTime
    var diff = endTime - currentTime;

    // If the difference is null, stop the timer
    if (diff < 0) {

        // Show restart button
        document.getElementById("countdown").innerHTML = "<button onclick='location.reload()'><i class='fas fa-redo'></i></button>";

        // Stop the timer
        clearInterval(timer);

    } else {

        // Get hours, minutes and seconds
        var hours = Math.floor(diff / (1000 * 60 * 60));
        var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Format the time
        hours = formatTime(hours);
        minutes = formatTime(minutes);
        seconds = formatTime(seconds);

        // Check if there is less than 10 seconds left AND minutes is 0
        if (seconds < 10 && minutes == 0) {

            // Display the time in the countdown mm:ss
            document.getElementById("countdown").innerHTML = seconds;

        } else {

            // Display the time
            document.getElementById("countdown").innerHTML = hours + ":" + minutes + ":" + seconds;
        }
    }

    // Check if there is less than 10 seconds left
    if (diff <= 10000) {

        // Change the font size to be double the size
        document.getElementById("countdown").style.fontSize = "50vh";

    }

}, 100);