var express = require('express');
var svr = express();
svr.use(express.static('htdocs'));
svr.listen(8081,'0.0.0.0');

// etwas Dynamic .. geht sogar ohne transpiler
svr.get('/gettime', (req, res)=>{
	res.send('Mir haben\'s:<br><br> ' + (new Date()));
});

