// controller
var db = require('./../db'); 

module.exports.create = (req,res,next)=>{
  var page = req.body.page;
  db.pages.create(page, function(err, page) {
    if (err) return next(err);
    res.send(page);
  });	
};

// provides several formats
module.exports.show = function(req, res, next) {
  db.pages.find(req.params['id'], function(err, page) {
    if (err) return next(err);
    // branch on accept-type: funktionierte irgendwie nur mit express, nicht mit restifiy 
    // res.format({
    //   json:()=>{res.send(page);},
    //   xml:()=>{res.send('<page><title>'+page.title+'</title></page>');}
    // });    
    res.send(page);

  });
};