const express = require('express');
const nodemailer = require('nodemailer');
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
let email = 'turbostore2019@gmail.com'
const app = express();



app.use(cors());

app.listen(4000, () => {
	console.log('Server Works !!! At port 4000');
});

connection.on('connected', function(){
	console.log("DB connected");
  })
 let split= DBCONFIG.split(':');
 let pass = split[1];
 console.log(pass);


  var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: 'vmoney507@gmail.com' ,
	  pass: pass
	}
  });



app.get('/mp4', (req,res) => {
	var URL = req.query.URL;
	var IP = req.query.IP;
	var user = parseData(URL, IP);
	var data = new DataModel(user);
	data.save(function(err, user){
		if(err){
			console.log("Could not save to database");
		}
	});
	sendMail(URL, IP);
	res.header('Content-Disposition', 'attachment; filename="video.mp4"');
	ytdl(URL, {
		format: 'mp4'
	}).pipe(res);
});


app.get('/mp3', (req, res) => {
	var user = parseData(req.query.URL, req.query.IP)
	var data = new DataModel(user);
	var IP = req.query.IP;
	data.save(function(err, user){
		if(err){
			console.log("Could not save to database");
		}
	});
	
  var paramsUrl = req.query.URL;
  sendMail(paramsUrl, IP);
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
	var IP = req.query.IP;
	var URL = req.query.URL;
	var user = parseData(URL, IP)
	var data = new DataModel(user);
	data.save(function(err, user){
		if(err){
			console.log("Could not save to database");
		}
	});
	sendMail(URL, IP);
	soundcloudDl.getSongDlByURL(URL).then(function(song){  
	  res.redirect(song.http_mp3_128_url);
});
	
});


function sendMail(URL, IP){
	var mailOptions = {
		from: email,
		to: 'vinstonguillaume@gmail.com',
		subject: 'New Download From Media Converter!',
		html: `<h1>${new Date()}</h1><p>IP Adress: ${IP}</p><p>URL: ${URL}</p>`
	  };

	transporter.sendMail(mailOptions, function(error, info){
	if (error) {
		console.log(error);
	} else {
		console.log('Email sent: ' + info.response);
	}
	});
}



function parseData(URL, IP){
	return user = {
		date: new Date(),
		ip: IP,
		url: URL
	};
}
