/**
*
*
*/

var express = require ("express");
var app = new express();
var http = require("https");

var fs = require('fs');
var Log = require('log'),
	logger = new Log("debug");//'error' for production
	//logger = new Log("debug",  fs.createWriteStream(__dirname +'/output-debug/nodestream.log')); 

var port = process.env.PORT || 443;
var options = {
  key: fs.readFileSync('cert/key.pem'),
  cert: fs.readFileSync('cert/key-cert.pem')
};

app.use(express.static(__dirname + '/public'));
app.get('/', function(){
	res.redirect('index.html');
});

var server = http.createServer(options, app).listen(port , function(){
	logger.info('Server listening in port: ' + port);
});

var io = require("socket.io")(server);
io.on('connection', function(socket){
	
	logger.info('Someone conected');
	
	socket.on('stream', function(image){
		socket.broadcast.emit('stream', image);
	});
});


