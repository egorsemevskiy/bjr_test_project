"use strict";

var clock = document.querySelector('#clock');
var clockTwelve = document.querySelector('#main-clock-12');
var clockTwentyFour = document.querySelector('#main-clock-24');
var currentTimeLeftInSession = 60;
var xhr = new XMLHttpRequest();
var dateTimeLink = 'http://worldtimeapi.org/api/timezone/Europe/Moscow';
document.addEventListener("DOMContentLoaded", function (event) {
  var clockTimer = setInterval(function () {
    currentTimeLeftInSession--;
    console.log(currentTimeLeftInSession);
  }, 1000);
});
xhr.open('GET', dateTimeLink, false);
xhr.send();

if (xhr.status != 200) {
  console.log(xhr.status + ': ' + xhr.statusText);
} else {
  console.log(xhr.responseText);
}