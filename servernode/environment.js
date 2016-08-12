var bodyParser = require('body-parser');
var helmet = require('helmet');

module.exports = function(app, express){
	
	app.use(express.static(__dirname + '/public'));
	app.use(helmet());
	app.disable('x-powered-by');
	app.use( bodyParser.json() );  
	app.use(bodyParser.urlencoded({     
	  extended: true
	}));
	
};