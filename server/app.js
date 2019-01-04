const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const soundcloudDl = require("soundcloud-dl");
const cors = require('cors');
const ytdl = require('ytdl-core');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
const horizon = require('horizon-youtube-mp3');
const mongoose = require('mongoose');
const DataModel = require('./model/data.model');
const DBCONFIG = process.env.DBHOST;
const log = require('console-log-level')({ level: 'info' });
const connection = mongoose.connection;
const email = 'turbostore2019@gmail.com';

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${DBCONFIG}@cluster0-zb5te.gcp.mongodb.net/mediaconverter`);


ffmpeg.setFfmpegPath(ffmpegInstaller.path);


const app = express();
app.use(cors());

app.listen(4000, () => {
	console.log('Server Works !!! At port 4000');
});

connection.on('connected', function(){
	console.log("DB connected");
});

let split= DBCONFIG.split(':');
let pass = String (split[1].trim());

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: 'vmoney507@gmail.com' ,
	  pass: pass
	}
  });



app.get('/mp4', (req,res) => {
	let TYPE = "youtube-mp4";
	var URL = req.query.URL;
	var IP = req.query.IP;
	var user = parseData(URL, IP, TYPE);
	var data = new DataModel(user);
	data.save(function(err, user){
		if(err){
			console.log("Could not save to database");
		}
	});
	sendMail(URL, IP, TYPE);
	res.header('Content-Disposition', 'attachment; filename="video.mp4"');
	ytdl(URL, {
		format: 'mp4'
	}).pipe(res);
});


app.get('/mp3', (req, res) => {
	let TYPE = "youtube-mp3";
	var IP = req.query.IP;
	var URL = req.query.URL;
	var user = parseData(URL,IP,TYPE)
	var data = new DataModel(user);

	data.save(function(err, user){
		if(err){
			console.log("Could not save to database");
		}
	});
	
	sendMail(URL, IP, TYPE);
	horizon.download(URL, res, null, null, null, false, function(err, e){

		if(err) {
			res.sendFile(path.join(__dirname + '/error.html'));
		}

		if(e === horizon.successType.CONVERSION_FILE_COMPLETE){
		log.info(e);
		
		}

	});

});

app.get('/soundcloud', (req, res, next) => {
	let TYPE = "soundcloud-mp3";
	var IP = req.query.IP;
	var URL = req.query.URL;
	var user = parseData(URL, IP, TYPE)
	var data = new DataModel(user);

	data.save(function(err, user){
		if(err){
			console.log("Could not save to database");
		}
	});
	
	sendMail(URL, IP, TYPE);
	soundcloudDl.getSongDlByURL(URL).then(function(song){  
	  res.redirect(song.http_mp3_128_url);
});
	
});


function sendMail(URL, IP, TYPE){
	var mailOptions = {
		from: email,
		to: 'vinstonguillaume@gmail.com',
		subject: 'New Download From Media Converter!',
		html: `<h1>${new Date()}</h1><p>IP Adress: ${IP}</p><p>URL: ${URL}</p><p>Type: ${TYPE}`
	  };

	transporter.sendMail(mailOptions, function(error, info){
	if (error) {
		console.log(error);
	} else {
		console.log('Email sent: ' + info.response);
	}
	});
}



function parseData(URL, IP, TYPE){
	return user = {
		date: new Date(),
		ip: IP,
		url: URL,
		type: TYPE
	};
}
