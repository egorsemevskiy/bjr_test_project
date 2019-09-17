(function(){
  const 	clock = document.querySelector('#clock'),
      clockTwelve = document.querySelector('#main-clock-12'),
      clockTwentyFour = document.querySelector('#main-clock-24'),
      analogClock = document.querySelector("#myClock");

  let a = false,
    dateTime = new Date(),
    interval = 0,
    xhr = new XMLHttpRequest(),
    city = "Europe/Samara",
    dateTimeLink = 'http://worldtimeapi.org/api/timezone/',
    BjrClocks = {
      initialize: () => {
        clockTwelve.addEventListener('click', () => {
          a = true;
        });
        clockTwentyFour.addEventListener('click', () => {
           a = false;
        });
        analogClock.addEventListener("change", BjrClocks.handleCityChoise);
      } ,
      tiktak: () => {
        clearTimeout(interval);
        let time = dateTime.getTime();
        time += 1000;
        dateTime.setTime(time);
        BjrClocks.clockAction(dateTime);
        interval = setTimeout(BjrClocks.tiktak, 1000);
      },
      handleCityChoise: (e) => {
        city = e.target.value;
        BjrClocks.getTime();
      },
      
      getTime: () => {
        clearTimeout(interval);
        clock.innerHTML = "Loading...";
        let link = dateTimeLink + city;
        BjrClocks.get(link).then(function(datePromise) {
          let dateJson = JSON.parse(datePromise),
            date = dateJson.datetime.split(/\D/);
          dateTime = new Date(date[0], date[1]-1, date[2], date[3], date[4], date[5]);
          BjrClocks.clockAction( dateTime);
          BjrClocks.tiktak();
        }, function(error) {
          console.log("Error!!!");
          console.log(error);
          setTimeout(BjrClocks.getTime, 2000);
        });
      },
      
      printClock: (h,m,s) => {
        if (a == true){
          let ampm = h >= 12 ? 'pm' : 'am';  
          h = h % 12;
          h = h ? h : 12;
          clock.innerHTML = (h +":"+m+":"+s +" " + ampm);
        } else {
          clock.innerHTML = (h +":"+m+":"+s);
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
          if(xhr)
            xhr.abort();
          xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.addEventListener("load", function() {
          if (xhr.status < 400)
            succeed(xhr.response);
          else
            fail(new Error("Request failed: " + xhr.statusText));
          });
          xhr.addEventListener("error", function() {
            fail(new Error("Network error"));
          });
          xhr.send();
        });
      }
    };
    document.addEventListener("DOMContentLoaded", function(e) {
      BjrClocks.initialize();
      BjrClocks.getTime();
    });
}());