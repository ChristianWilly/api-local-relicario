const jwt = require('jsonwebtoken')
const config = require('../Configuration/config.json')

module.exports = (req, res, next) =>{
	const header = req.headers.authorization

	if(!header) return res.status(400).send({ error: "Token não informado"})
	
	const parts = header.split(" ")
	if(parts.length !== 2) return res.status(401).send({ error: "Erro no tamanho do header/tokken"})

	const [ bearer, token] = parts
	if(!/^Bearer$/i.test(bearer)) return res.status(401).send({ errro: "Não existe o Bearer no array do tokken"}) 

	jwt.verify( token, config.key, (err,decoded)=>{
		if(err) return res.status(401).send({ erro: "O Token mandado esta invalido"})
		req.id = decoded.id
		req.expire = decoded.expire
		return next()
	})
}