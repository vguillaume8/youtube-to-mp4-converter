var express = require('express');
path = require('path');
server = express();


var port = 80;


server.use(express.static(path.join(__dirname, '/')));

server.listen(port);

console.log("Listening on port " + port);