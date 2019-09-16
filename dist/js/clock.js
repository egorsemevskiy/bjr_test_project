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
      a = true;
      BjrClocks.getTime();
    });
    clockTwentyFour.addEventListener('click', function () {
      a = false;
      BjrClocks.getTime();
    });
    BjrClocks.getTime();
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
  printClock: function printClock(h, m, s) {
    if (a == true) {
      var ampm = h >= 12 ? 'pm' : 'am';
      h = h % 12;
      h = h ? h : 12;
      clock.innerHTML = h + ":" + m + ":" + s + " " + ampm;
    } else {
      var i = 0;

      var _loop = function _loop(_h) {
        var _loop2 = function _loop2(_m) {
          var _loop3 = function _loop3(_s) {
            setInterval(function () {
              clock.innerHTML = _h + ":" + _m + ":" + _s;
            }, 1000);
          };

          for (var _s; _s < 60; ++_s) {
            _loop3(_s);
          }
        };

        for (var _m; _m < 60; _m++) {
          _loop2(_m);
        }
      };

      for (var _h; _h < 24; _h++) {
        _loop(_h);
      }
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
  }
};
document.addEventListener("DOMContentLoaded", function () {
  BjrClocks.initialize();
});