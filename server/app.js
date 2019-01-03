const express = require('express');
const path = require('path');
const soundcloudDl = require("soundcloud-dl");
const cors = require('cors');
const ytdl = require('ytdl-core');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
var horizon = require('horizon-youtube-mp3');
var log = require('console-log-level')({ level: 'info' });
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const app = express();

app.use(cors());

app.listen(4000, () => {
	console.log('Server Works !!! At port 4000');
});

app.get('/mp4', (req,res) => {
	var URL = req.query.URL;
	res.header('Content-Disposition', 'attachment; filename="video.mp4"');
	ytdl(URL, {
		format: 'mp4'
	}).pipe(res);
});

app.get('/', (req, res) => {
	res.send("you're at root");
})

app.get('/mp3', (req, res) => {
	
	var paramsUrl = req.query.URL;
  log.info('URL Video: ' + paramsUrl);

  var cropParams = null;

  horizon.download(paramsUrl, res, null, cropParams, null, false, function(err, e){

    if(err) {
		res.sendFile(path.join(__dirname + '/error.html'));
    }

    if(e === horizon.successType.CONVERSION_FILE_COMPLETE){
	  log.info(e);
	  
    }

});

});

app.get('/soundcloud', (req, res, next) => {

	var url = req.query.URL;
	soundcloudDl.getSongDlByURL(url).then(function(song){  
	  res.redirect(song.http_mp3_128_url);
});
	
});

