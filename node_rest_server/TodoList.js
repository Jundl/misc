/**
* node ES6 modul 
* node4.4.7 versteht komplett kein ES6.
* Daher dazu babel als "Preprocessor" verwenden (ES6=>ES5)
*/
export default class TodoList{
	constructor(){
		this.list=[];
	}
	getList() {
		return this.list;
	}
	addTodo(t) {
		this.list.push({text:String(t), done:false});
	}
	log(){
		this.list.forEach((t,i)=>{console.log(i +": " + t.text + ": " + t.done);});
	}
	cleanUp(){
		var clist=[];
		this.list.forEach((el)=>{
			if(!el.done){
				clist.push(el);
			}
		});
		this.list=clist;
	}
}
