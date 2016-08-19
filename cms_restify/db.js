
// das persistance modul ist erstmal nur eine collection im hauptspeicher 
// diese wird exportiert.
// notice: jede Zugriffsmethode bekommt ein callback mit und liefert nie return


var errors = require('./errors'); 

//constructor
function Collection(){
	this.store={};
	this.lastId=0;
}

// insert
Collection.prototype.create = function(obj, cb) {
  this.lastId++;
  obj.id = this.lastId;
  this.store[this.lastId] = obj;
  cb(null, obj);
};

// get
Collection.prototype.find = function(id, cb) {
  id = parseInt(id, 10);
  var obj = this.store[id];
  if (obj) {
    cb(null, obj);
  } else {
    cb(new errors.NotFound('Item not found'));
  }
};

module.exports.pages = new Collection();