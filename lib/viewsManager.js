

var config = module.parent.exports.config;

express = require('express');

ViewsManager = function(app) {

	/**
	 * Init
	 * 	 Rendering Home view
	 */

	app.get('/', function(req,res){
	
		res.render('home');
	
	});
	
	/**
     * Registration
     *    Rendering Registration view
     */
	app.get('/signup', function(req,res){
		
		res.render('signup');
	});
	
	/**
     * Login 
     *   Rendering Login view
     */
	app.get('/login', function(req,res){
		
		res.render('login');
	});
	
	


};

exports.ViewsManager = ViewsManager;