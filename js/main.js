var xhr = new XMLHttpRequest();

var dateTimeLink = 'http://worldtimeapi.org/api/timezone/Europe/Moscow';

xhr.open('GET', dateTimeLink, false);

xhr.send();

if (xhr.status != 200) {
    console.log( xhr.status + ': ' + xhr.statusText );
} else {
    console.log( xhr.responseText ); 
}