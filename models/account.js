var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	name: String,
	role: String,
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Blog"
		}
	]
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
