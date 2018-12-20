var mp4 = document.querySelector('.mp4');
var mp3 = document.querySelector('.mp3');
var mp3 = document.querySelector('.soundcloud');
var URLinput = document.querySelector('.URL-input');

mp4.addEventListener('click', () => {
	console.log(`URL: ${URLinput.value}`);	
	sendMP4(URLinput.value);
});
mp3.addEventListener('click', () => {
	console.log(`URL: ${URLinput.value}`);	
	sendMP3(URLinput.value);
});
soundcloud.addEventListener('click', () => {
	console.log(`URL: ${URLinput.value}`);
	sendSoundCloud(URL.input.value);
});	

function sendMP4(URL) {
	window.location.href = `http://35.196.195.50:4000/mp4?URL=${URL}`;
}

function sendMP3(URL) {
	window.location.href = `http://35.196.195.50:4000/mp3?URL=${URL}`;
}

function sendSoundCloud(URL) {
	window.location.href = `http://35.196.195.50:4000/soundcloud?URL=${URL}`;
}