// babel komponente "register": Transpiliere alles, was nicht unter node_modules steht
require('babel/register');
mod=require('./TodoList.js');
var list = new mod();
// var list = new mod.TodoList();	// geht auch, bei Klassendefinition ohne default
list.addTodo('soccer');
list.addTodo('golf');
list.addTodo('dance');
list.getList()[0].done=true;
list.log();
