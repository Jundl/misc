require('babel/register');
mod=require('./TodoList.js');
var list = new mod.TodoList();
list.addTodo('soccer');
list.addTodo('golf');
list.addTodo('dance');
list.getList()[0].done=true;
list.log();
