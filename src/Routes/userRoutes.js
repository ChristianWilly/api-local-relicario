const express = require('express')
const router = express.Router()


// IMPORT DE ARQUIVOS
const userModel = require('../Models/userModel.js')

router.get("/", (req, res) => {
	userModel.find()
		.then(response =>{			
			res.json(response)
		})
	})

//     PESQUISA / BUSCA
router.get("/search=:termo", async (req, res) => {
	let pesquisa = req.params.termo
	let retorno
	userModel.find()
	.then( response => {
		response.map( e => { 
				if(Object.values(e) === pesquisa){
					retorno = e
				}
			})
		
	}).then( () => res.json(retorno))
})

//    CADASTRAMENTO
router.post("/register", async (req, res) =>{
	const email = req.body.email

	try{
		if(await userModel.findOne({ email })){
			res.status(400).send({error : "Este email ja foi cadastrado."})
		}
		const user = await userModel.create(req.body)
		user.senha = undefined
		return res.send({user})
	}catch(err){
			res.status(400).send({error : "Falha no cadastramento. Contate o administrador do sistema"})
	}
})

//   AUTENTICAÇÃO
router.post("/login-auth", async (req, res)=>{
	const { email , senha } = req.body

	const user = await userModel.findOne({ email }).select("+senha");
	
	if(!user) return res.status(400).send('Usuário ou senha incorreto(s) ou não existem.' )
	if(senha !== user.senha) return res.status(401).send("Usuário ou senha incorreto(s) ou não existem.")
	
 	user.senha = undefined
 	let username = user.name
	req.session.loggedin = true;
	req.session.username = username;
	res.redirect(301,'http://localhost:3000/home');
})

module.exports = router