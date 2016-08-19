// die app lauft komplett  ohne express, dafür mit restify
//
// openssl info:
//  anzeigen cert inhalt:
//      %openssl x509 -in cert.pem -text -noout
//  checken key:
//      %openSSL rsa -in key.pem -check  

var app;
var restify = require('restify');
var routes = require('./routes');
// module.exports = app = restify.createServer({ //<co id="callout-web-restify-1" />
//   name: 'NIP CMS',
// });
app = restify.createServer({name:'REST CMS'});

module.exports = app;

app.use(restify.bodyParser());

app.get('/pages/:id', routes.pages.show);
app.post('/pages', routes.pages.create);

