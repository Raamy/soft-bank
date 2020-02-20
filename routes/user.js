const express = require('express');
const { pool } = require('../config/db');
const bcrypt = require('bcrypt');
const router_user = express.Router();

//   GET - /user/role/id :User          			- Affichage de tous les USER(customer)
router_user.get('/', (request,response) =>{
	pool.query("SELECT id, name, firstname, role, mail, login, password, to_char(dateofbirth, 'DD/MM/YYYY') as dateofbirth,to_char(dateaccountcreation, 'DD/MM/YYYY') as dateaccountcreation  FROM user_user", (error, result)=>{ // fonction anonyme
		if(error){
			//response.status(400).json({status:'error', message: 'Remplir tous les champs'});
			throw new Error('Error request');
		}
		else{
			response.status(200).json(result.rows);
		}
	});
});

//   GET - /user/role/id :User          			- Affichage d'un USER(Customer) selon son id.
router_user.get('/:id', (request,response) =>{
	const id = parseInt(request.params.id);
	pool.query("SELECT id, surname, name, role, mail, login, password, to_char(dateofbirth, 'DD/MM/YYYY') as dateofbirth,to_char(dateaccountcreation, 'DD/MM/YYYY') as dateaccountcreation FROM user_user WHERE id=$1",[id],(error, result)=>{ // fonction anonyme
		if(error){
			//response.status(400).json({status:'error', message: 'Remplir tous les champs'});
			throw new Error('Error request');
		}
		else{
			response.status(200).json(result.rows);
		}
	});
});

// POST - /user/add 								- Création d'un user(rôle customer par défaut pour l'inscription)
router_user.post('/add', (request, response) => {
	const { name, surname, mail, login, password, dateOfBirth } = request.body;
	var customer = 'customer';
	let hash = bcrypt.hashSync(password, 10);
	pool.query(`INSERT INTO user_user (name, surname, role, mail, login, password, dateAccountCreation, dateOfBirth) VALUES ($1, $2, 'customer', $3, $4, $5,NOW(), $6)`,
		[name, surname, mail, login, hash, dateOfBirth], error =>{ // toujours retourner un tableau
		if (error){
			response.status(400).json({status:'error', message: 'Remplir tous les champs'});
		}
		else{
			response.status(201).json({status:'success', message:'User ajouté'});
		}
	});
});

// DELETE - /user/delete/id							- Suppression d'un utilisateur selon son ID.
router_user.delete('/delete/:id', (request, response)=>{
	const id = parseInt(request.params.id);
	pool.query('DELETE FROM user_user WHERE id = $1', [id], error =>{
		if(error){
			response.status(400).json({status:"error", message: 'Remplir tous les champs'});
		}
		else{
			response.status(201).json({status:'success', message:'User supprimé'});
		}
	});
});

// Edit - /edit/id									- Modification des champs d'un utilisateur selon son ID.
router_user.put('/edit/:id', (request, response)=>{
	const id = parseInt(request.params.id);
	const { name, surname, role, mail, login, password, dateAccountCreation, dateOfBirth } = request.body;

	pool.query('UPDATE user_user SET name=$1, surname=$2, mail=$3, login=$4, password=$5 WHERE id = $6', [name, surname, mail, login, password, id], error=>{
		if(error){
			throw new Error('Error request');
			//response.status(400).json({status:'error', message:'Remplir tous les champs'});
		}
		else{
			response.status(201).json({status:'success', message:'Livre modifié'});
		}
	});
});

// Edit - /edit/id									- Modification des champs d'un utilisateur selon son ID.
router_user.put('/edit/role/:id', (request, response)=>{
	const id = parseInt(request.params.id);
	const role = request.body.role;

	pool.query('UPDATE user_user SET role=$1 WHERE id = $2', [role, id], error=>{
		if(error){
			throw new Error('Error request');
			//response.status(400).json({status:'error', message:'Remplir tous les champs'});
		}
		else{
			response.status(201).json({status:'success', message:'Livre compte modifié'});
		}
	});
});

//qui compte le nombre de comptes d'un utilisateur selon son id
router_user.get('/allaccounts/user/:id', (request,response) =>{
	const id = parseInt(request.params.id);
	pool.query('SELECT count(*) as total_count from account, user_user where user_user.id = account.userid and user_user.id = $1', [id], (error, result)=>{
		if(error){
			throw new Error('Error request');
		}
		else{
			response.status(200).json(result.rows[0]);
		}
	});
});

//qui renvoie le premier compte associé au user (dans l'ordre croissant)
router_user.get('/firstAccount/:id', (request,response) =>{
	const id = parseInt(request.params.id);
	pool.query('SELECT * from account, user_user where user_user.id = account.userid  and user_user.id = $1 order by account.id asc limit 1', [id], (error, result)=>{
		if(error){
			throw new Error('Error request');
		}
		else{
			response.status(200).json(result.rows[0]);
		}
	});
});

//renvoie tout les utilisateurs sauf celui connecté
router_user.get('/others/:id', (request,response) =>{
	const id = parseInt(request.params.id);
	pool.query("SELECT id, name FROM user_user WHERE id<>$1",[id],(error, result)=>{ // fonction anonyme
		if(error){
			//response.status(400).json({status:'error', message: 'Remplir tous les champs'});
			throw new Error('Error request');
		}
		else{
			response.status(200).json(result.rows);
		}
	});
});

module.exports = router_user;