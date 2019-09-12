"use strict";

var _this = void 0;

var BjrClocks = {
  initialize: function initialize() {
    clockTwelve.addEventListener('click', function () {
      a = true;
      BjrClocks.clockAction;
    });
    clockTwentyFour.addEventListener('click', function () {
      console.log(_this);
      a = false;
      BjrClocks.clockAction;
    });
  },
  clockAction: function clockAction() {
    var date = new Date(),
        hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    BjrClocks.printClock(hours, minutes, seconds);
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
  }
};
var clock = document.querySelector('#clock');
var clockTwelve = document.querySelector('#main-clock-12');
var clockTwentyFour = document.querySelector('#main-clock-24');
var a = false;
var xhr = new XMLHttpRequest();
var dateTimeLink = 'http://worldtimeapi.org/api/timezone/Europe/Moscow';

function getTime() {
  xhr.open('GET', dateTimeLink, false);
  xhr.send();

  if (xhr.status != 200) {
    console.log(xhr.status + ': ' + xhr.statusText);
  } else {
    displayCurrentTime(xhr.responseText);
  }
}

function displayCurrentTime(text) {
  time = JSON.parse(text).unixtime;
  console.log(time);
}

document.addEventListener("DOMContentLoaded", function () {
  BjrClocks.initialize();
});