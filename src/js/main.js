

const clock = document.querySelector('#clock');
const clockTwelve = document.querySelector('#main-clock-12');
const clockTwentyFour = document.querySelector('#main-clock-24');
const analogClock = document.querySelector("#myClock");

let a = false;
let xhr = new XMLHttpRequest();
let dateTimeLink = 'http://worldtimeapi.org/api/timezone/Europe/Moscow';


let BjrClocks = {
   
    initialize: () => {
        BjrClocks.clockAction();

        clockTwelve.addEventListener('click', () => {
            a = true;
            BjrClocks.clockAction;
        });
        clockTwentyFour.addEventListener('click', () => {
            a = false;
            BjrClocks.clockAction;
        });

        get(dateTimeLink).then(function(text) {
            clockAction(text);
            }, function(error) {
            console.log("Error!!!");
            console.log(error);
        });
    },

    clockAction: (text) => {
        let date = new Date(text*1000),
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
             clock.innerHTML = (h +":"+m+":"+s +" " + ampm)
        }else {
             clock.innerHTML = (h +":"+m+":"+s);
        }
    },
    get: (url) => {
        return new Promise(function(succeed, fail) {
          var request = new XMLHttpRequest();
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
    
};


 
let analogClockController = {
    initialize: () =>{
       setInterval(analogClockController.buildClock,1000)
   
    },
    buildClock: () => {
       let d = new Date();
       analogClock.innerHTML = d.toLocaleTimeString();
    },

    displayCanvas: () => {
       
       let contextHTML = analogClock.getContext('2d');
 
  
    contextHTML.strokeRect(0,0,analogClock.width, analogClock.height);
	
    //Расчет координат центра и радиуса часов
    let radiusClock = analogClock.width/2 - 10;
    let xCenterClock = analogClock.width/2;
    let yCenterClock = analogClock.height/2;
	
    //Очистка экрана. 
    contextHTML.fillStyle = "#ffffff";
    contextHTML.fillRect(0,0,analogClock.width,analogClock.height);
	
    //Рисуем контур часов
    contextHTML.strokeStyle =  "#000000";
    contextHTML.lineWidth = 1;
    contextHTML.beginPath();
    contextHTML.arc(xCenterClock, yCenterClock, radiusClock, 0, 2*Math.PI, true);
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.stroke();
    contextHTML.closePath();
	
    //Рисуем рисочки часов
    let radiusNum = radiusClock - 10; //Радиус расположения рисочек	
    let radiusPoint;
    for(let tm = 0; tm < 60; tm++){
	  contextHTML.beginPath();
	  if(tm % 5 == 0){radiusPoint = 5;}else{radiusPoint = 2;} //для выделения часовых рисочек
	  let xPointM = xCenterClock + radiusNum * Math.cos(-6*tm*(Math.PI/180) + Math.PI/2);
	  let yPointM = yCenterClock - radiusNum * Math.sin(-6*tm*(Math.PI/180) + Math.PI/2);
	  contextHTML.arc(xPointM, yPointM, radiusPoint, 0, 2*Math.PI, true);
	  contextHTML.stroke();
	  contextHTML.closePath();
    } 
	
    //Оцифровка циферблата часов
    for(let th = 1; th <= 12; th++){
	contextHTML.beginPath();
	contextHTML.font = 'bold 25px sans-serif';
	let xText = xCenterClock + (radiusNum - 30) * Math.cos(-30*th*(Math.PI/180) + Math.PI/2);
	let yText = yCenterClock - (radiusNum - 30) * Math.sin(-30*th*(Math.PI/180) + Math.PI/2);
	if(th <= 9){
		contextHTML.strokeText(th, xText - 5 , yText + 10);
	}else{
		contextHTML.strokeText(th, xText - 15 , yText + 10);
	}
     	contextHTML.stroke();
	contextHTML.closePath();	
    }

	
    //Рисуем стрелки
    let lengthSeconds = radiusNum - 10;
    let lengthMinutes = radiusNum - 15;
    let lengthHour = lengthMinutes / 1.5;
    let d = new Date();                //Получаем экземпляр даты
    let t_sec = 6*d.getSeconds();                           //Определяем угол для секунд
    let t_min = 6*(d.getMinutes() + (1/60)*d.getSeconds()); //Определяем угол для минут
    let t_hour = 30*(d.getHours() + (1/60)*d.getMinutes()); //Определяем угол для часов
	
    //Рисуем секунды
    contextHTML.beginPath();
    contextHTML.strokeStyle =  "#FF0000";
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthSeconds*Math.cos(Math.PI/2 - t_sec*(Math.PI/180)),
				yCenterClock - lengthSeconds*Math.sin(Math.PI/2 - t_sec*(Math.PI/180)));
    contextHTML.stroke();
    contextHTML.closePath();

    //Рисуем минуты
    contextHTML.beginPath();
    contextHTML.strokeStyle =  "#000000";
    contextHTML.lineWidth = 3;
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthMinutes*Math.cos(Math.PI/2 - t_min*(Math.PI/180)),
				 yCenterClock - lengthMinutes*Math.sin(Math.PI/2 - t_min*(Math.PI/180)));
    contextHTML.stroke();
    contextHTML.closePath();

    //Рисуем часы
    contextHTML.beginPath();
    contextHTML.lineWidth = 5;
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthHour*Math.cos(Math.PI/2 - t_hour*(Math.PI/180)),
				 yCenterClock - lengthHour*Math.sin(Math.PI/2 - t_hour*(Math.PI/180)));
    contextHTML.stroke();
    contextHTML.closePath();	
	
    //Рисуем центр часов
    contextHTML.beginPath();
    contextHTML.strokeStyle =  "#000000";
    contextHTML.fillStyle = "#ffffff";
    contextHTML.lineWidth = 3;
    contextHTML.arc(xCenterClock, yCenterClock, 5, 0, 2*Math.PI, true);
    contextHTML.stroke();
    contextHTML.fill();
    contextHTML.closePath();
	  
    return;

    }
}


document.addEventListener("DOMContentLoaded", function() { 
    BjrClocks.initialize();
    AjaxDateTime.initialize();
    analogClockController.initialize();
    setInterval(BjrClocks.clockAction,1000);
    setInterval( analogClockController.displayCanvas,1000);
});         
