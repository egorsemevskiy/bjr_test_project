const clock = document.querySelector('#clock');
const clockTwelve = document.querySelector('#main-clock-12');
const clockTwentyFour = document.querySelector('#main-clock-24');

let currentTimeLeftInSession = 60;
let xhr = new XMLHttpRequest();
let dateTimeLink = 'http://worldtimeapi.org/api/timezone/Europe/Moscow';


xhr.open('GET', dateTimeLink, false);
xhr.send();
if (xhr.status != 200) {
    console.log( xhr.status + ': ' + xhr.statusText );
} else {
    console.log( xhr.responseText ); 
}

  
document.addEventListener("DOMContentLoaded", function(event) { 
  let  clockTimer = setInterval(() => {
        currentTimeLeftInSession--;
    }, 1000);
  });

 

