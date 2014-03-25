

var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

MongoDBController = function( config ){

	this.db = new Db( config.db.name, new Server(config.db.host, config.db.port) );
	this.db.open( function( error, db){
		if(error) console.log("Failed to connecto to DB.");
		else console.log( "Connected to DB:" + config.db.name );
	});	

	/**
	 * Insert a document in a collection
	 * Params:
	 *    - collName: Collection's name
	 *    - doc: Document in JSON format
	 */
	 this.insert = function( collName, doc, cb ){
	 
		this.db.collection( collName, function( error, collection){
		
			if( error ) cb(error, null);
			else{
				collection.insert([doc], function( error, document){
					
					if( error ) cb( error, null);
					else cb(null, document[0]);
				
				});
			
			}
			
		});
	
	 };
	

	/**
	 * Fetch all documents of a collection
	 * Params:
	 *    - collName: Collection's name
	 */
	this.fetchAll = function(collName, cb) {
		this.db.collection(collName, function(error, collection) {
			if (error) cb(error, null);
		    else {
				collection.find().toArray(function(error, results) {
					cb(error, results);
				});
			}
		});
	};	
	
	/**
	 * Find one document of a collection
	 * Params:
	 *    - collName: Collection's name
	 *    - cond: Conditions
	 */
	this.findOne = function(collName,cond,cb){
		this.db.collection(collName, function(error,collection){
		
			if(error) cb(erro,null);
			else{
			
				collection.findOne( cond, function(error, result){
				
					if(error) cb(error,null);
					else cb(null, result);
				
				});
			
			}
		});
	
	};
	
	

};

exports.MongoDBController = MongoDBController;