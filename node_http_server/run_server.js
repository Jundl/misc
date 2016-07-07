var express = require('express');
var svr = express();
svr.use(express.static('htdocs'));
svr.listen(8081,'0.0.0.0');

// etwas Dynamic:
svr.get('/gettime', function(req, res){
	res.send('Mir haben\'s:<br><br> ' + (new Date()));
});

