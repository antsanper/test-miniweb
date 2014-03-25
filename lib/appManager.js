
var config = module.parent.exports.config;
var BSON = require('mongodb').BSONPure;
var http = require('http');
var ObjectID = require('mongodb').ObjectID;
var cryp = require('bcrypt-nodejs');

express = require('express');

AppManager = function(app,mongoController){


	/**
     * Create an user account
     * Params:
     *    - Request Body (req.body) : User's data.
     */
	app.post('/signup', function(req,res){
	
		var data = req.body;
	
		console.log("Registration data:" + JSON.stringify(data));
		
		mongoController.findOne( config.collections.users, { email: data.email}, function(error,users){
		
			if( users ) res.render('signup',{error:"User already exists"});
			else {
			
				data.password = generatePassword(data.password);
			
				mongoController.insert( config.collections.users, data, function( error, user){
				
					if(error) res.render('signup',{error:'An error occured during the registration'});
					else {
					
						var ipAddress = req.connection.remoteAddress;
					
						var freegeoip = require('node-freegeoip');
					
						freegeoip.getLocation(ipAddress, function(err, location) {
							
							res.render('logged',{emai:data.email, country:location.country_name, lon: location.longitude, lat: location.latitude});
							
						});
					
					}
				
				});
			}
		
		
		});
		
	});
	
	
	/**
     * Login 
     * Params:
     *   - Request Body (req.body): Login data (email, password) in JSON format.
     */
	app.post('/login', function(req, res){
	
		var data = req.body;
		
		console.log('Data info:' +  JSON.stringify(data) );
		
		// The user exists 
		mongoController.findOne( config.collections.users, { email: data.email}, function(error,users){
		
			if( !users ) res.render('login',{error:"User does not exist"});
			else {
			
				cryp.compare( data.password, users.password, function(error, result){  // Verify the password
			
					if(result){
					
						// Getting the IP Address of the request
						var ipAddress = req.connection.remoteAddress;
					
						var freegeoip = require('node-freegeoip');
					
						freegeoip.getLocation(ipAddress, function(err, location) {
						
							if(error){
							
							   res.render('error',{error:"An error occured during the login "});
							} else {
							
								console.log(location.country_name);
							
								res.render('logged',{emai:data.email, country:location.country_name, lon: location.longitude, lat: location.latitude});
							}
							
						});
							
					} else {
					  res.render('login',{error:"Incorrect password"});  
					}
			
			    });
				
			}
	
		});
	
	});
};


function generatePassword( password ){
	
		return cryp.hashSync( password, cryp.genSaltSync() );
 };

exports.AppManager = AppManager;