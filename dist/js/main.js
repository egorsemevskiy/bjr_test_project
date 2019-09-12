"use strict";

var clock = document.querySelector('#clock');
var clockTwelve = document.querySelector('#main-clock-12');
var clockTwentyFour = document.querySelector('#main-clock-24');
var currentTimeLeftInSession = 60000;
var xhr = new XMLHttpRequest();
var dateTimeLink = 'http://worldtimeapi.org/api/timezone/Europe/Moscow';
clockTwelve.addEventListener('click', function () {
  toggleClock();
});
clockTwentyFour.addEventListener('click', function () {
  toggleClock();
});
document.addEventListener("DOMContentLoaded", function (event) {
  clockTimer = setInterval(function () {
    currentTimeLeftInSession--;
    console.log(currentTimeLeftInSession);
  }, 1000);
});

var toggleClock = function toggleClock(reset) {
  if (reset) {// STOP THE TIMER
  } else {
    if (isClockRunning === true) {
      // PAUSE THE TIMER
      isClockRunning = false;
    } else {
      // START THE TIMER
      isClockRunning = true;
    }
  }
};

console.log(currentTimeLeftInSession);
xhr.open('GET', dateTimeLink, false);
xhr.send();

if (xhr.status != 200) {
  console.log(xhr.status + ': ' + xhr.statusText);
} else {
  console.log(xhr.responseText);
}