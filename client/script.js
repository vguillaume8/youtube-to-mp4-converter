var mp4 = document.querySelector('.mp4');
var mp3 = document.querySelector('.mp3');
var URLinput = document.querySelector('.URL-input');

mp4.addEventListener('click', () => {
	console.log(`URL: ${URLinput.value}`);	
	sendMP4(URLinput.value);
});
mp3.addEventListener('click', () => {
	console.log(`URL: ${URLinput.value}`);	
	sendMP3(URLinput.value);
});

function sendMP4(URL) {
	window.location.href = `http://35.237.46.180:4000/mp4?URL=${URL}`;
}

function sendMP3(URL) {
	window.location.href = `http://35.237.46.180:4000/mp3?URL=${URL}`;
}