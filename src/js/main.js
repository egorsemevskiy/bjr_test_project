const clock = document.querySelector('#clock');
const clockTwelve = document.querySelector('#main-clock-12');
const clockTwentyFour = document.querySelector('#main-clock-24');
let a = true;
let xhr = new XMLHttpRequest();
let dateTimeLink = 'http://worldtimeapi.org/api/timezone/Europe/Moscow';


xhr.open('GET', dateTimeLink, false);
xhr.send();
if (xhr.status != 200) {
    console.log( xhr.status + ': ' + xhr.statusText );
} else {
    displayCurrentTime( xhr.responseText ); 
}

  
    document.addEventListener("DOMContentLoaded", function(event) { 
        setInterval(clockAction, 1000);
  });

 

function displayCurrentTime(text)  {
    console.log(text);
}

function clockAction(){
    let date = new Date(),
         hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
        minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
        seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
        clock.innerHTML = (hours +":"+minutes+":"+seconds);
        printClock(hours, minutes, seconds);
}


  function printClock(h, m, s){
      if (a == true){

        let ampm = h >= 12 ? 'pm' : 'am';
   
        h = h % 12;
        h = h ? h : 12; 
 
        clock.innerHTML = (h +":"+m+":"+s +" " + ampm)
      }else {
        clock.innerHTML = (h +":"+m+":"+s);
      }
        
  }