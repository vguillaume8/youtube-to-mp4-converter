var mp4 = document.querySelector('.mp4');
var mp3 = document.querySelector('.mp3');
var soundcloud = document.querySelector('.soundcloud');
var URLinput = document.querySelector('.URL-input');
var HOST = 'http://35.231.107.15:4000';

mp4.addEventListener('click', () => {
	if(URLinput.value.length > 0 && URLinput.value.includes('youtube.com')){
		sendMP4(URLinput.value);
		
	}else{
		alert("Paste valid link first");
	}
	//console.log(`URL: ${URLinput.value}`);	
	
});
mp3.addEventListener('click', () => {
	if(URLinput.value.length > 0 && URLinput.value.includes('youtube.com')){
		sendMP3(URLinput.value);
		
	}else{
		alert("Paste valid link first");
	}
});
soundcloud.addEventListener('click', () => {
	if(URLinput.value.length > 0 && URLinput.value.includes("soundcloud.com")){
		sendSoundCloud(URLinput.value);
		
	}else{
		alert("Paste valid link first");
	}
});	

function sendMP4(URL) {
	let UserIP = captureUserIp();
	window.location.href = `${HOST}:4000/mp4?URL=${URL}&IP=${UserIP}`;
}

function sendMP3(URL) {
	let UserIP = captureUserIp();
	window.location.href = `${HOST}:4000/mp3?URL=${URL}&IP=${UserIP}`;
}

function sendSoundCloud(URL) {
	let UserIP = captureUserIp();
	window.location.href = `${HOST}:4000/soundcloud?URL=${URL}&IP=${UserIP}`;
}

function captureUserIp(){
   var xmlHttp = new XMLHttpRequest();
   xmlHttp.open( "GET", "https://httpbin.org/ip", false ); // false for synchronous request
   xmlHttp.send( null );
   let result = JSON.parse(xmlHttp.responseText);
   return result['origin'];
}
