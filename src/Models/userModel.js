const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true,
		unique: true
	},
	accessType: {
		type: String,
		require: true
	},	
	senha: {
		type: String,
		require: true,
		select: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model("usuários", userSchema)