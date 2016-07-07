var express = require('express');
var svr = express();
svr.use(express.static('htdocs'));
svr.listen(8081,'0.0.0.0');

// etwas Dynamic .. geht sogar ohne transpiler
svr.get('/gettime', (req, res)=>{
	res.send('Mir haben\'s:<br><br> ' + (new Date()));
});

// websockets:
var http = require('http');
var webServer = http.Server(svr);
var sio = require('socket.io');
var io = sio(webServer);

io.on('connection', function(socket){
	console.log('new client');
});

var stdin=process.openStdin();
stdin.addListener("data",function(d){
	io.emit('nachricht', d.toString());
});

webServer.listen(8082,'0.0.0.0');
