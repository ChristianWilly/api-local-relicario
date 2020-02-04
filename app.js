const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')

require('dotenv/config')

// IMPORT DE ARQUIVOS INTERNOS
const userRoute = require('./src/Routes/userRoutes.js')


// CONFIGURAÇÕES DO SERVIDOR
mongoose.connect( process.env.URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
}, ()=> console.log('Server up!'))

//CONFIGURAÇÕES GERAIS 
const app = express()

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true}))
app.use( bodyParser.json())
app.use(cors({
	Origin: "*"
}))


// ACESSOS ÀS ROTAS
app.use("/user", userRoute)



app.listen( process.env.PORT || 5000, ()=> console.log('Servidor ouvindo na porta 5000'))