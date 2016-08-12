
module.exports = function (mongoose) {
    
	var Schema = mongoose.Schema; 

	var Server = new Schema({
	    name: { type: String, required: true },
	    passw: { type: String, required: true },
	    email: { type: String, required: true }
	});

    return mongoose.model('User', Server);
};