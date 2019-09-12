
let BjrClocks = {
    clock : document.querySelector('#clock'),
    initialize: () => {
        clockTwelve.addEventListener('click', () => {
            a = true;
            BjrClocks.clockAction;
        });
        clockTwentyFour.addEventListener('click', () => {
            console.log(this);
            a = false;
            BjrClocks.clockAction;
        });
    },

    clockAction: () => {
        let date = new Date(),
        hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
        minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
        seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
        BjrClocks.printClock(hours, minutes, seconds);
    },

    printClock: (h,m,s) => {
        if (a == true){
            let ampm = h >= 12 ? 'pm' : 'am';   
            h = h % 12;
            h = h ? h : 12; 
            BjrClocks.clock.innerHTML = (h +":"+m+":"+s +" " + ampm)
        }else {
            BjrClocks.clock.innerHTML = (h +":"+m+":"+s);
        }
    }
    
};

const clock = document.querySelector('#clock');
const clockTwelve = document.querySelector('#main-clock-12');
const clockTwentyFour = document.querySelector('#main-clock-24');
let a = false;
let xhr = new XMLHttpRequest();
let dateTimeLink = 'http://worldtimeapi.org/api/timezone/Europe/Moscow';

function getTime(){
    xhr.open('GET', dateTimeLink, false);
    xhr.send();
    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        displayCurrentTime( xhr.responseText ); 
    }
}

function displayCurrentTime(text)  {
    time =  JSON.parse(text).unixtime;
    console.log(time);
}

document.addEventListener("DOMContentLoaded", function() { 
    BjrClocks.initialize();
});         