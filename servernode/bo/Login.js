/**
* Mongo CRUD Users - REST
* Jesus Juan Aguilar. 2016 - jesusjuanaguilar@gmail.com
*
* Documentacion Mongoose: https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/nodestream");
var User = require('../models/User')(mongoose);
var ObjectId = mongoose.Types.ObjectId;
var Log = require('log'),
	logger = new Log("debug");

function StartPaths(app){
	
	app.post('/login/newUser', function(req, res) {newUser(req,res);});
	app.post('/login/checkUser', function(req, res) {checkUser(req,res);});
}

function newUser(req, res) {

	var sv = new User({
		name: req.body.user_name,
    	passw: req.body.user_passw,
    	email: req.body.user_email
	});
	console.log()
	
	sv.save(function (err) {
		if (!err) {
			logger.info('User Saved');
			res.send(true);
			res.end();
		} else {
			logger.info('Error Saving');
			res.status(500).send({ error: '[Error: Servers Mongo] No se ha podido insertar.'});
			res.end();
		}
	});
}
						
function checkUser(req, res) {
	
	User.count({name: req.body.user_name, passw: req.body.user_passw}, function(err,count) { 
		if (count >0) {
			
			User.findOne({ name: req.body.user_name, passw: req.body.user_passw }, function(err, user) {
			  if (err) throw err;

			  	res.send(user);
				res.end();
			  });
			logger.info('user Logged');
			
		} else {
			logger.info('error log');
			res.send(false);
			res.end();
		}
	});
	
}


exports.startPaths = StartPaths;
