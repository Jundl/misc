var express = require('express');
var defaultHttpSvr = express();
defaultHttpSvr.use(express.static('htdocs'));

// etwas Dynamic .. geht sogar ohne transpiler
defaultHttpSvr.get('/gettime', (req, res)=>{
	res.send('Mir haben\'s:<br><br> ' + (new Date()));
});

// websockets:
// der WS Server wrappt den def server wie ein apache module oder filter
var http = require('http');
var webSocketHttpSvr = http.Server(defaultHttpSvr);
var sio = require('socket.io');
var sioObject = sio(webSocketHttpSvr);

sioObject.on('connection', function(socket){
	console.log('new client');
});

var stdin=process.openStdin();
stdin.addListener("data",function(d){
	sioObject.emit('nachricht', d.toString());
});

webSocketHttpSvr.listen(8082,'0.0.0.0');
