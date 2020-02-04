const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')


// JWT Hash
const config = require('../Configuration/config.json')

// IMPORT DE ARQUIVOS
const userModel = require('../Models/userModel.js')

// GERADOR DE TOKEN
function geraToken(params){
	return jwt.sign(params, config.key, {expiresIn: 2000})
}





//    CADASTRAMENTO
router.post("/register", async (req, res) =>{
	const email = req.body.email

	try{
		if(await userModel.findOne({ email })){
			res.status(400).send({error : "Este email ja foi cadastrado."})
		}
		const user = await userModel.create(req.body)
		user.senha = undefined
		res.json({user, token: geraToken({id: user.id})})
	}catch(err){
			res.status(400).send({error : "Falha no cadastramento. Contate o administrador do sistema"})
	}
})




//   AUTENTICAÇÃO DE LOGIN
router.post("/auth", async (req, res)=>{
	const { email , senha } = req.body
	const user = await userModel.findOne({ email }).select("+senha");
	
	if(!user) return res.status(400).send('Usuário ou senha incorreto(s) ou não existem.' )
	if(senha !== user.senha) return res.status(401).send("Usuário ou senha incorreto(s) ou não existem.")
	
 	user.senha = undefined
	res.json({user, token: geraToken({id: user.id})})
})

module.exports = router