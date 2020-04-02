const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema({
	content: String
});


module.exports = Session = mongoose.model('session', SessionSchema)