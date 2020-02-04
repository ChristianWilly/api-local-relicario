const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true
	},
	sname: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true,
		unique: true
	},
	senha: {
		type: String,
		require: true,
		select: false
	},	
	cep: {
		type: String,
	},	
	rua: {
		type: String,
	},	
	cidade: {
		type: String,
	},
	estado: {
		type: String,
	},
	accessType: {
		type: String,
	},	
	createdAt: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model("usuários", userSchema)