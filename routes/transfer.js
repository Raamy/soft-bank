const express = require('express');
const { pool } = require('../config/db');

const transfer_account = express.Router();

//   GET - transfer/account/accountID : Banquier, User          - Affichage de l'historique des transferts selon l'id du compte.
transfer_account.get('/account/:accountid', (request,response) =>{
    const accountid = parseInt(request.params.accountid)
    pool.query("SELECT id, sender, receiver, transfer_value, to_char(transfer_date, 'DD/MM/YYYY') as transfer_date FROM transferhistory WHERE sender = $1 OR receiver = $1",
        [accountid], (error, result)=>{ // fonction anonyme
            if(error){
                //response.status(400).json({status:'error', message: 'Remplir tous les champs'});
                throw new Error('Error request');
            }
            else{
                response.status(200).json(result.rows);
            }
        });
});

//   PUT - transfer/id/overdraft_value/transfer_value : Banquier  - Modification de la balance et du solde_découvert d'un compte
transfer_account.put('/:id_account/:overdraft_value/:transfer_value/', (request, response) => {
    const id_account = parseInt(request.params.id_account);
    const TV = parseInt(request.params.transfer_value);
    const overdraft_value = parseInt(request.params.overdraft_value);
    pool.query('UPDATE account SET balance=$1, overdraft_value=$2 WHERE id=$3', [TV, overdraft_value, id_account], error=>{
        if(error){
            response.status(400).json({status:"error", message: 'Update failed'});
        }
        else{
            response.status(201).json({status:'success', message:'Success : Account Modified'});
        }
    });
});

//   PUT - transfer/id/overdraft_value/transfer_value : Banquier  - Modification de la balance d'un compte
transfer_account.put('/:id_account/:transfer_value/', (request, response) => {
    const id_account = parseInt(request.params.id_account);
    const transfer_value = parseInt(request.params.transfer_value);
    pool.query('UPDATE account SET balance=$1 WHERE id=$2', [transfer_value, id_account], error=>{
        if(error){
            response.status(400).json({status:"error", message: 'Update sender failed'});
        }
        else{
            response.status(201).json({status:'success', message:'Success : Account Modified'});
        }
    });
});

//   GET - transfer/: Banquier, User                             - Affichage de tous les historiques de transfert.
transfer_account.get('/', (request,response) =>{
    pool.query("SELECT id, sender, receiver, transfer_value, to_char(transfer_date, 'DD/MM/YYYY') as transfer_date FROM transferhistory", (error, result)=>{
        if(error){
            //response.status(400).json({status:'error', message: 'Remplir tous les champs'});
            throw new Error('Error request');
        }
        else{
            response.status(200).json(result.rows);
        }
    });
});

//   GET - transfer/accountID/transferID : Banquier, User      - Affichage de tous les historiques de transfert selon l'id du compte et l'id du transfert.
transfer_account.get('/:account_id/:tranferid', (request,response) =>{ // ETRANGE
    const account_id = parseInt(request.params.account_id);
    const tranferid = parseInt(request.params.tranferid);
    pool.query("SELECT id, sender, receiver, transfer_value, to_char(transfer_date, 'DD/MM/YYYY') as transfer_date FROM transferhistory WHERE id = $2 AND sender = $1 OR receiver = $1",[account_id, tranferid], (error, result)=>{ // fonction anonyme
        if(error){
            throw new Error('Error request');
            //response.status(400).json({status:"error", message: 'All fields required'});
        }
        else{
            response.status(200).json(result.rows);
        }
    });
});

//   GET - transfer/transferDate : Banquier, User            - Affichage de toutes les dates de transferts.
transfer_account.get('/:transfer_date', (request,response) =>{
    var date = request.params.transfer_date;
    pool.query("SELECT to_char(transfer_date, 'DD/MM/YYYY') as transfer_date FROM transferhistory WHERE transfer_date = $1",[date], (error, result)=>{
        if(error){
            throw new Error('Error request');
            //response.status(400).json({status:"error", message: 'All fields required'});
        }
        else{
            response.status(200).json(result.rows);
        }
    });
});

//   DELETE - transfer/delete/accountID/transferID : Banquier  - Suppression d'un transfert de l'historique selon id du compte et id du transfert
transfer_account.delete('/delete/:transferid', (request, response)=>{
    const transferid = parseInt(request.params.transferid);
    pool.query('DELETE FROM transferhistory WHERE id = $1', [transferid], error =>{
        if(error){
            throw new Error('Error request');
            //response.status(400).json({status:"error", message: 'All fields required'});
        }
        else{
            response.status(201).json({status:'success', message:'Success : Account Deleted'});
        }
    });
});

//  PUT - transfer/idcompte/idcompte2/transfer_value           - Modification de la balance du receveur et du compte envoyeur après transaction.
transfer_account.put('/:id_compte1/:id_compte2/:transfer_value', (request, response) => {
    const id_sender = parseInt(request.params.id_compte1);
    const id_recever = parseInt(request.params.id_compte2);
    const TV = parseInt(request.params.transfer_value);
    const { sender, receiver, transfer_value, transfer_date } = request.body;

    pool.query('UPDATE account SET balance=balance+$1 WHERE id=$2', [TV, id_sender], error=>{
        if(error){
            response.status(400).json({status:"error", message: 'Update sender failed'});
        }
        else{
            response.status(201).json({status:'success', message:'Success : Account Modified'});
        }
    });

    pool.query('UPDATE account SET balance=balance-$1 WHERE id=$2', [TV, id_recever], error=>{
        if(error){
            response.status(400).json({status:"error", message: 'Update receiver failed'});
        }
        else{
            response.status(201).json({status:'success', message:'Success : Account Modified'});
        }
    });

});

// POST - transfer/idcompte1/idcompte2/transfer_value           - Ajout d'un transfer entre deux comptes.
transfer_account.post('/:id_compte1/:id_compte2/:transfer_value', (request, response) => {
    const id_sender = parseInt(request.params.id_compte1);
    const id_recever = parseInt(request.params.id_compte2);
    const TV = parseInt(request.params.transfer_value);
    const { sender, receiver, transfer_value, transfer_date } = request.body;
    pool.query('INSERT INTO transferhistory (sender, receiver, transfer_value, transfer_date) VALUES ($1, $2, $3, NOW())',
        [id_sender, id_recever, TV], error =>{
            if (error){
                response.status(400).json({status:'error', message: 'Remplir tous les champs POST'});
            }
            else{
                response.status(201).json({status:'success', message:'User ajouté'});
            }
        });
});

module.exports = transfer_account;