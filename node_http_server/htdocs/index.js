// var MessageBus = require('./messagebus'); 
// var messagebus = new MessageBus();     // TODO: geht doch auch direkt in einer Zeile!
// var $ = require('jquery')(window);

// messagebus.on('message', function(msg){
//     $('#messages').append('<p>'+msg + '</p>');
// });

// $(function(){
//     messagebus.emit('message','page load completed !');
// });
    var MessageBus = require('./messagebus'); 
    var messagebus = new MessageBus();     // TODO: geht doch auch direkt in einer Zeile!

    messagebus.on('message', function(msg){
        alert(msg);
        document.querySelector('#messages').innerHtml='<p>'+msg + '</p>';
    });
