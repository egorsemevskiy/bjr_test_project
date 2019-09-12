const clock = document.querySelector('#clock');
const clockTwelve = document.querySelector('#main-clock-12');
const clockTwentyFour = document.querySelector('#main-clock-24');

let currentTimeLeftInSession = 60000;
let xhr = new XMLHttpRequest();
let dateTimeLink = 'http://worldtimeapi.org/api/timezone/Europe/Moscow';




clockTwelve.addEventListener('click', () => {
    toggleClock();
  })
  
  clockTwentyFour.addEventListener('click', () => {
    toggleClock();
  })
  
  document.addEventListener("DOMContentLoaded", function(event) { 
    clockTimer = setInterval(() => {
        currentTimeLeftInSession--;
        console.log(currentTimeLeftInSession);
    }, 1000)
  });

 

  const toggleClock = (reset) => {
    if (reset) {
      // STOP THE TIMER
    } else {
      if (isClockRunning === true) {
        // PAUSE THE TIMER
        isClockRunning = false;
      } else {
        // START THE TIMER
        isClockRunning = true;
      }
    }
  }



 




  console.log(currentTimeLeftInSession);


xhr.open('GET', dateTimeLink, false);

xhr.send();

if (xhr.status != 200) {
    console.log( xhr.status + ': ' + xhr.statusText );
} else {
    console.log( xhr.responseText ); 
}