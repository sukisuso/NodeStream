/*
 * Router 
 * Jesus Juan Aguilar 07/2016
 * */
var login =  require('./bo/Login');

function route(app) {
	
	login.startPaths(app);
}

exports.redirect = route;