"use strict";

var clock = document.querySelector('#clock');
var clockTwelve = document.querySelector('#main-clock-12');
var clockTwentyFour = document.querySelector('#main-clock-24');
var analogClock = document.querySelector("#myClock");
var a = false;
var xhr = new XMLHttpRequest();
var city = "Andorra";
var dateTimeLink = 'http://worldtimeapi.org/api/timezone/Europe/' + city;
var BjrClocks = {
  initialize: function initialize() {
    clockTwelve.addEventListener('click', function () {
      a = true;
      BjrClocks.getTime();
    });
    clockTwentyFour.addEventListener('click', function () {
      a = false;
      BjrClocks.getTime();
    });
  },
  getTime: function getTime() {
    BjrClocks.get(dateTimeLink).then(function (datePromise) {
      var dateJson = JSON.parse(datePromise);
      var dateTime = new Date(dateJson.unixtime * 1000);
      BjrClocks.clockAction(dateTime);
    }, function (error) {
      console.log("Error!!!");
      console.log(error);
    });
  },
  getTimeCityChoise: function getTimeCityChoise(url) {
    BjrClocks.get(url).then(function (datePromise) {
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
      clock.innerHTML = h + ":" + m + ":" + s + " " + ampm;
    } else {
      clock.innerHTML = h + ":" + m + ":" + s;
    }
  },
  clockAction: function clockAction(dateTime) {
    var hours = dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours(),
        minutes = dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes(),
        seconds = dateTime.getSeconds() < 10 ? '0' + dateTime.getSeconds() : dateTime.getSeconds();
    BjrClocks.printClock(hours, minutes, seconds);
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
  },
  handleCityChoise: function handleCityChoise(e) {
    var dateTimeChoiseLink = 'http://worldtimeapi.org/api/timezone/Europe/' + e.dataset.city;
    BjrClocks.getTimeCityChoise(dateTimeChoiseLink);
    console.log(dateTimeChoiseLink);
  }
};
document.addEventListener("DOMContentLoaded", function () {
  BjrClocks.initialize();
  setInterval(BjrClocks.getTime, 60000);
});