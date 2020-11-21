var mp4 = document.querySelector('.mp4');
var mp3 = document.querySelector('.mp3');
var soundcloud = document.querySelector('.soundcloud');
var URLinput = document.querySelector('.URL-input');
var HOST = 'http://localhost:4000';

mp4.addEventListener('click', () => {
	if(URLinput.value.length > 0 && (URLinput.value.includes('youtube.com') || URLinput.value.includes('youtu.be'))){
		sendMP4(URLinput.value);
		
	}else{
		alert("Paste valid link first");
	}
	//console.log(`URL: ${URLinput.value}`);	
	
});
mp3.addEventListener('click', () => {
	if(URLinput.value.length > 0 && (URLinput.value.includes('youtube.com') || URLinput.value.includes('youtu.be'))){
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
	window.location.href = `${HOST}/mp4?URL=${URL}&IP=${UserIP}`;
}

function sendMP3(URL) {
	let UserIP = captureUserIp();
	window.location.href = `${HOST}/mp3?URL=${URL}&IP=${UserIP}`;
}

function sendSoundCloud(URL) {
	let UserIP = captureUserIp();
	window.location.href = `${HOST}/soundcloud?URL=${URL}&IP=${UserIP}`;
}

function captureUserIp(){
   var xmlHttp = new XMLHttpRequest();
   xmlHttp.open( "GET", "https://httpbin.org/ip", false ); // false for synchronous request
   xmlHttp.send( null );
   let result = JSON.parse(xmlHttp.responseText);
   return result['origin'];
}
