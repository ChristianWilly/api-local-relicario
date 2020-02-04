const middleWare = require('../Middlewares/validationTokken.js')
cont



//   RETORNA TODOS OS USUÁRIOS
router.get("/", middleWare ,(req, res) => {
	userModel.find()
		.then(response =>{			
			res.json(response)
		})
	})


//     PESQUISA / BUSCA
router.get("/search=:termo", middleWare ,async (req, res) => {
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

