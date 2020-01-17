//      GET - accounts/id : Banquier, User
//      GET - account/id : Banquier, User
//      PUT - account/id : Banquier
//      DELETE - account/id : Banquier
// 		POST - account/add : Banquier

const express = require('express');
const { pool } = require('../config/db');

const router_account = express.Router();

// faire un POST account ! INSERT INTO

//   GET - account/accountID : Banquier, User //afficher un compte
router_account.get('/:id', (request,response) =>{
	const id = parseInt(request.params.id);
		pool.query('SELECT * FROM account WHERE id = $1',[id], (error, result)=>{ // fonction anonyme
		if(error){
			throw new Error('Error request');
		}
		else{
			response.status(200).json(result.rows);
		}
	});
});

//   GET - account/accountID : Banquier, User //afficher tous les comptes
router_account.get('/', (request,response) =>{
		pool.query('SELECT * FROM account',(error, result)=>{ // fonction anonyme
		if(error){
			response.status(400).json({status:"error", message: 'All fields required'});
		}
		else{
			response.status(200).json(result.rows);
		}
	});
});



//   GET - account/user/userid : Banquier, User //afficher tous les comptes d'un utilisateur spécifique
router_account.get('/user/:userid', (request,response) =>{
	const userid = parseInt(request.params.userid);
		pool.query('SELECT * FROM account WHERE userid = $1',[userid], (error, result)=>{ // fonction anonyme
		if(error){
				response.status(400).json({status:"error", message: 'All fields required'});
		}
		else{
			response.status(200).json(result.rows);
		}
	});
});

//   GET - account/userID/accountID : Banquier, User //afficher un des compte d'un utilisateur spécifique
router_account.get('/:userid/:accountid', (request,response) =>{
	const userid = parseInt(request.params.userid);
	const accountid = parseInt(request.params.accountid);
		pool.query('SELECT * FROM account WHERE userid = $1 AND id = $2 ',[accountid, userid], (error, result)=>{ // fonction anonyme
		if(error){
				response.status(400).json({status:"error", message: 'All fields required'});
		}
		else{
			response.status(200).json(result.rows);
		}
	});
});

// Post data account - account/add
router_account.post('/add', (request, response) => {
	const { name, userid, balance, overdraft } = request.body;
	pool.query('INSERT INTO account (name, userid, balance, overdraft) VALUES ($1, $2, $3, $4)', [name, userid, balance, overdraft], error =>{ // toujours retourner un tableau
		if (error){
			response.status(400).json({status:'error', message: 'Remplir tous les champs'});
		}
		else{
			response.status(201).json({status:'success', message:'User ajouté'});
		}
	});
});


//   PUT - account/id : Banquier
router_account.put('/edit/:accountid/:user_id', (request,response) =>{
	const user_id = parseInt(request.params.user_id);
	const accountid = parseInt(request.params.accountid);
	const { name, userid, balance, overdraft } = request.body;
	pool.query('UPDATE account SET name=$1, balance=$2, overdraft=$3 WHERE id=$4 AND userid=$5', [name, balance, overdraft, accountid, user_id], error=>{
		if(error){
			response.status(400).json({status:"error", message: 'All fields required'});
		}
		else{
			response.status(201).json({status:'success', message:'Success : Account Modified'});
		}
	});
});

//   PUT - account/edit/deposit/id_compte/id_user/ 			- Effectue le dépot sur le compte
router_account.put('/edit/deposit/:accountid/:user_id', (request,response) =>{
	const user_id = parseInt(request.params.user_id);
	const accountid = parseInt(request.params.accountid);
	const {balance} = request.body;
	pool.query('UPDATE account SET balance=balance+$1 WHERE id=$2 AND userid=$3', [balance, accountid, user_id], error=>{
		if(error){
			response.status(400).json({status:"error", message: 'All fields required'});
		}
		else{
			response.status(201).json({status:'success', message:'Success : Account Modified'});
		}
	});
});

//   PUT - account/id : Banquier
router_account.put('/edit/:accountid', (request,response) =>{
	const accountid = parseInt(request.params.accountid);
	const { name, userid, balance, overdraft } = request.body;
	pool.query('UPDATE account SET name=$1, balance=$2, overdraft=$3 where id=$4', [name, balance, overdraft, accountid], error=>{
		if(error){
			response.status(400).json({status:"error", message: 'All fields required'});
		}
		else{
			response.status(201).json({status:'success', message:'Success : Account Modified'});
		}
	});
});

//   DELETE - account/id : Banquier
router_account.delete('/delete/:userid/:accountid', (request, response)=>{
	const userid = parseInt(request.params.userid);
	const accountid = parseInt(request.params.accountid);
	pool.query('DELETE FROM account WHERE id = $1 and userid = $2', [accountid, userid], error =>{
		if(error){
			response.status(400).json({status:"error", message: 'All fields required'});
		}
		else{
			response.status(201).json({status:'success', message:'Success : Account Deleted'});
		}
	});
});

//   DELETE - account/id : Banquier
router_account.delete('/delete/:accountid', (request, response)=>{
	const accountid = parseInt(request.params.accountid);
	pool.query('DELETE FROM account WHERE id = $1', [accountid], error =>{
		if(error){
			response.status(400).json({status:"error", message: 'All fields required'});
		}
		else{
			response.status(201).json({status:'success', message:'Success : Account Deleted'});
		}
	});
});



// Attention on supprime ou modifie un compte d'un user en particulier !!!
// attention dans les requêtes SQL

module.exports = router_account;