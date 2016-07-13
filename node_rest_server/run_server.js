console.log('run_server rest');
var express = require('express');
var bodyparser = require('body-parser');
var server = express();

server.use(express.static('htdocs'));
server.use(bodyparser.json());

require('babel/register');
todoMod=require('./TodoList.js')
var myList = new todoMod();

myList.addTodo('soccer');
myList.addTodo('gym');


// etwas Dynamic .. geht sogar ohne transpiler?
/**
* GET todos
*/
server.get('/todos', (req, res)=>{
	console.log('server.get()');
	res.send(myList);
});

/**
* POST new todo
*/
server.post('/todos', (req, res)=>{
	console.log('server.post():' + req);
	myList.addTodo(req.body.text);
	res.send();
});

/**
* PUT changed todo
*/
server.put('/todos/:idx', (req, res)=>{
	console.log('server.put():' + req);
	myList.getList()[req.params.idx]=req.body; // diesmal wird der komplette body als Objekt übernommen
	myList.log();	
	res.send();
});

/**
* DELETE: attention, does not the expected but calls cleanUp()
*/
server.delete('/todos', (req, res)=>{
	console.log('server.delete()' );
	myList.cleanUp();
	myList.log();	
	res.send();
});

server.listen(8081,'0.0.0.0');


