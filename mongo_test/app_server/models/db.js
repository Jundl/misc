// test mongo-connections mit mongoose und native (parallel opend) ..geht

var mongoose = require('mongoose');
var readline = require('readline');
// was is das da fürn komischer pfad hinten dran? 
// var dbURI = (process.env.NODE_MOD=='prod')?'mongodb://ds029635.mlab.com:29635/heroku_2j450r53 -u foo -p test':'mongodb://localhost/meineDB';
// notice: local mongodb 3.2, heroku 3.0
// lokal ohne --auth
var dbURI = (process.env.NODE_ENV == 'prod') ? 'foo:test@ds029635.mlab.com:29635/heroku_2j450r53' : 'mongodb://localhost/meineDB';
mongoose.connect(dbURI);

mongoose.connection.on('connected', testQueries, testNative);
mongoose.connection.on('disconnected', () => { console.log('..disconnected..'); });
mongoose.connection.on('error', (err) => { console.log('..error:', err); });

// krassikowsky..Trick 17, um die DB-Connections am Ende zu schließen: damit ctrl-C den Client nicht einfach beendet und die Connection in der Luft hängt, wird die stdin einfach mal eingelesen, ohne darauf zu reagieren.
if (process.platform === 'win32') {
    console.log("geiles windows system, hehe");
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on("SIGINT", () => {
        process.emit("SIGINT");
        console.log('SIGINT emitted.');
    });
}

process.on('SIGINT', () => {
    gracefulShutdown('feierabend', () => {
        process.exit(0);
    });
});

var gracefulShutdown = function (msg, cb) {
    mongoose.connection.close(() => { console.log('conn closed..', msg); cb(); });
}


function testMogooseQuery() {
    console.log('testMogooseQuery() on ', dbURI);
    // mal was in eine coll schreiben, die es (beim 1. Aufruf) noch nicht gibt 
    var mySchema = mongoose.Schema({
        name: String
    });
    var Model = mongoose.model('test', mySchema);
    var m = new Model({ name: 'gerd g.' });
    m.save((e, v) => { if (!e) console.log('saved', v); else console.log(e); });
    // Kitten.find({name:'Starbucks'},(o)=>{console.log(o);},(o)=>{console.log(o);});
}

function testQueries() {
    testMogooseQuery();
    testNative();
}
function testNative() {
    console.log('testNative');
    // Retrieve
    var MongoClient = require('mongodb').MongoClient;

    if (!MongoClient) console.log('!!init mongoClient.');

    // Connect to the db
    MongoClient.connect("mongodb://localhost/meineDB", function (err, db) {
        if (!err) {
            console.log("We are connected");
            var collection = db.collection('tests');
            var doc1 = { 'name': 'doc1' };
            var doc2 = { 'name': 'doc2' };
            collection.insert(doc1, function (err, result) { console.log("inserted1"); });
            collection.insert(doc2, { w: 1 }, function (err, result) { console.log("inserted2"); });
        } else {
            console.log(e);
        }
    });
}