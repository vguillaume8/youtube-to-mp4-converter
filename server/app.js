const express = require('express');
const path = require('path');
const soundcloudDl = require("soundcloud-dl");
const cors = require('cors');
const ytdl = require('ytdl-core');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
var horizon = require('horizon-youtube-mp3');
const mongoose = require('mongoose');
const DataModel = require('./model/data.model');
let DBCONFIG = process.env.DBHOST;
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${DBCONFIG}@cluster0-zb5te.gcp.mongodb.net/mediaconverter`);
const connection = mongoose.connection;
var log = require('console-log-level')({ level: 'info' });
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const app = express();


app.use(cors());

app.listen(4000, () => {
	console.log('Server Works !!! At port 4000');
});

connection.on('connected', function(){
	console.log("DB connected");
  })

function parseData(URL, IP){
	return user = {
		date: new Date(),
		ip: IP,
		url: URL
	};
}

app.get('/mp4', (req,res) => {
	var user = parseData(req.query.URL, req.query.IP)
	var data = new DataModel(user);
	data.save(function(err, user){
		if(err){
			console.log("Could not save to database");
		}
	});
	
	res.header('Content-Disposition', 'attachment; filename="video.mp4"');
	ytdl(URL, {
		format: 'mp4'
	}).pipe(res);
});


app.get('/mp3', (req, res) => {
	var user = parseData(req.query.URL, req.query.IP)
	var data = new DataModel(user);
	data.save(function(err, user){
		if(err){
			console.log("Could not save to database");
		}
	});
	
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
	var user = parseData(req.query.URL, req.query.IP)
	var data = new DataModel(user);
	data.save(function(err, user){
		if(err){
			console.log("Could not save to database");
		}
	});

	var url = req.query.URL;
	soundcloudDl.getSongDlByURL(url).then(function(song){  
	  res.redirect(song.http_mp3_128_url);
});
	
});

