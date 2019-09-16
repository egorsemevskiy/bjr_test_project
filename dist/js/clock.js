"use strict";

var clock = document.querySelector('#clock');
var clockTwelve = document.querySelector('#main-clock-12');
var clockTwentyFour = document.querySelector('#main-clock-24');
var analogClock = document.querySelector("#myClock");
var a = false;
var xhr = new XMLHttpRequest();
var dateTimeLink = 'http://worldtimeapi.org/api/timezone/Europe/Moscow';
var BjrClocks = {
  initialize: function initialize() {
    clockTwelve.addEventListener('click', function () {
      a = true; //BjrClocks.clockAction;
    });
    clockTwentyFour.addEventListener('click', function () {
      a = false; //BjrClocks.clockAction;
    });
    BjrClocks.get(dateTimeLink).then(function (datePromise) {
      var dateJson = JSON.parse(datePromise);
      var dateTime = new Date(dateJson.unixtime * 1000);
      BjrClocks.clockAction(dateTime);
    }, function (error) {
      console.log("Error!!!");
      console.log(error);
    });
  },
  printClock: function printClock(h, m, s) {
    if (a == true) {
      var ampm = h >= 12 ? 'pm' : 'am';
      h = h % 12;
      h = h ? h : 12;
      setInterval(clock.innerHTML = h + ":" + m + ":" + s + " " + ampm, 1000);
    } else {
      setInterval(clock.innerHTML = h + ":" + m + ":" + s, 1000);
    }
  },
  clockAction: function clockAction(dateTime) {
    var hours = dateTime.getHours(),
        minutes = dateTime.getMinutes(),
        seconds = dateTime.getSeconds(); //BjrClocks.printClock(hours, minutes, seconds);

    console.log(true);
  },
  get: function get(url) {
    return new Promise(function (succeed, fail) {
      var request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.addEventListener("load", function () {
        if (request.status < 400) succeed(request.response);else fail(new Error("Request failed: " + request.statusText));
      });
      request.addEventListener("error", function () {
        fail(new Error("Network error"));
      });
      request.send();
    });
  }
};
document.addEventListener("DOMContentLoaded", function () {
  BjrClocks.initialize();
});