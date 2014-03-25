var   express = require('express')
    , http = require('http')
	, fs = require('fs')
	, cons = require('consolidate') 
	;
	
	
var app = express();


var config = JSON.parse( fs.readFileSync( process.cwd() + "/config.json"));
    module.exports.config = config;
	
var MongoDBController = require('./lib/mongoDBController').MongoDBController;
var mongoDBController = new MongoDBController(config);	


app.configure( function() {

	app.set('port', process.env.PORT || 3030);
	
	app.set('mongoDBController', mongoDBController);
	
	app.use( express.bodyParser() );
	
	app.engine('html', cons.swig);
	app.set('view engine', 'html');
	app.set('views', __dirname + '/lib');
	app.use(express.static(__dirname + '/lib'));
	app.use(app.router);
	
});

var AppManager = require('./lib/appManager').AppManager;
var appManagerService = new AppManager(app,mongoDBController);

var ViewsManager = require('./lib/viewsManager').ViewsManager;
var viewMaangerServie = new ViewsManager(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});