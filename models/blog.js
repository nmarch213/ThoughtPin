var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//mongoose schema
var blogSchema = new Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now},
	owner: String
});

module.exports = mongoose.model('Blog', blogSchema);