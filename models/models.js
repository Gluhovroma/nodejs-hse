var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	username: String,
	password: String, //hash created from password
	created_at: {type: Date, default: Date.now}
});

var employeeSchema = new mongoose.Schema({
	surname: String,
	name: String,
	patronymic: String, 
	email:String,
	position: { type: Schema.ObjectId, ref: 'Position' },
	subvision: { type: Schema.ObjectId, ref: 'Subdivision' },
	number: String
});

var positionSchema = new mongoose.Schema({
	name: String
});

var subdivisionSchema = new mongoose.Schema({	
	name: String
});




mongoose.model('User', userSchema);
mongoose.model('Employee', employeeSchema);
mongoose.model('Position', positionSchema);
mongoose.model('Subdivision', subdivisionSchema);


