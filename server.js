var express         = require('express');
var app             = express();
var mongoose        = require('mongoose');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var ip				= require('ip');


var db              = require('./config/db');
mongoose.Promise = global.Promise
var connection      = mongoose.connect(db.url);

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

require('./app/routes')(app);

app.listen(port);

console.log("Server at " + port + " with ip address " + ip.address());

exports = module.exports = app;