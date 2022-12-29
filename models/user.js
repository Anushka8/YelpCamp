var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

//adds a username, hash and salt field to store the username, the hashed password and the salt value
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);