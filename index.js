const express = require ('express'); // appel express 
//const { pool } = require('./config/db'); test de la connexion
const bodyParser = require('body-parser');
const accountRouter = require('./routes/account');
const userRouter = require('./routes/user');
const transferRouter = require('./routes/transfer');
const securityRouter = require('./routes/security');
const security = require('./middleware/security');
const app = express(); // on définit avec express les requêtes http qui vont être accessible
var cors = require('cors');

/* Ajoute l'en tête CORS pour : 'Access-Control-Allow-Origin' afin d'utiliser l'api
  cross domain */
app.use(cors({
	origin: 'http://localhost:3000'
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(security.verifyToken);
// app.use(securityRouter);

app.use('/transfer', transferRouter);
app.use('/account', accountRouter);
app.use('/user', userRouter);

app.listen(6565, ()=> {
	console.log('Listening on port 6565'); // Avant il ouvre le port 
}); //ouvrir un port au serveur































