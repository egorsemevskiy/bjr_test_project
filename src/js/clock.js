const clock = document.querySelector('#clock');
const clockTwelve = document.querySelector('#main-clock-12');
const clockTwentyFour = document.querySelector('#main-clock-24');
const analogClock = document.querySelector("#myClock");

let a = false;
let xhr = new XMLHttpRequest();
let dateTimeLink = 'http://worldtimeapi.org/api/timezone/Europe/Moscow';

let BjrClocks = { 
    initialize: () => {
        clockTwelve.addEventListener('click', () => {
            a = true;
            BjrClocks.getTime();
        });
        clockTwentyFour.addEventListener('click', () => {
            a = false;
            BjrClocks.getTime();
        });
        BjrClocks.getTime();
      } ,
      getTime: () => {
        BjrClocks.get(dateTimeLink).then(function(datePromise) {
            let dateJson = JSON.parse(datePromise);
            let dateTime = new Date(dateJson.unixtime*1000);
            BjrClocks.clockAction( dateTime);
            }, function(error) {
            console.log("Error!!!");
            console.log(error);
        });
      },
    
    printClock: (h,m,s) => {
    
        if (a == true){
            let ampm = h >= 12 ? 'pm' : 'am';   
            h = h % 12;
            h = h ? h : 12; 
             clock.innerHTML = (h +":"+m+":"+s +" " + ampm);
  
        }else {
             
            let i = 0;
            for(h; h<24;h++){
                for(m; m<60; m++){
                    for(s;s<60;++s){
                        setInterval(function() {
                            clock.innerHTML = (h +":"+m+":"+s)
                          }, 1000);
                    }
                }
            }
      
        }
    },
 

    clockAction: (dateTime) => {
       
        let hours = (dateTime.getHours() < 10) ? '0' + dateTime.getHours() : dateTime.getHours(),
        minutes = (dateTime.getMinutes() < 10) ? '0' + dateTime.getMinutes() : dateTime.getMinutes(),
        seconds = (dateTime.getSeconds() < 10) ? '0' + dateTime.getSeconds() : dateTime.getSeconds();
         BjrClocks.printClock(hours, minutes, seconds);
         
    },

    get: (url) => {
        return new Promise(function(succeed, fail) {
          let request = new XMLHttpRequest();
          request.open("GET", url, true);
          request.addEventListener("load", function() {
            if (request.status < 400)
              succeed(request.response);
            else
              fail(new Error("Request failed: " + request.statusText));
          });
          request.addEventListener("error", function() {
            fail(new Error("Network error"));
          });
          request.send();
        });
      }
}

document.addEventListener("DOMContentLoaded", function() { 
    BjrClocks.initialize();
});         
