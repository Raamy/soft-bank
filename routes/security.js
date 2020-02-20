const express = require('express');
const createToken = require('../config/auth').createToken;
const verifyToken = require('../config/auth').verifyToken;
const { pool } = require('../config/db');
const bcrypt = require('bcrypt');

const router = express.Router();


const getUsers = (email) => {
    return pool.query(`SELECT * FROM user_user WHERE mail=$1`, [email])
        .then(response => response.rows);
};

router.post('/', (request, response) => {
    const email = request.body.email;
    const password = request.body.password;
    getUsers(email)
        .then((user_user) => {
            if (user_user.length === 1 && bcrypt.compare(password, user_user[0].password)) {
                // Payload (ou Charge utile) contient les données de l'utilisateur
                userData = user_user[0];
                payload = {
                    id: userData.id,
                    name: userData.name,
                    email: userData.mail,
                    login: userData.login,
                    role: userData.role
                };
                // console.log(payload);
                // Création du Token en fonction du Payload
                const token = createToken(payload);
                // On renvoie le token si le login est bon
                response.send({
                    token
                });
            } else {
                response.status(400).send({
                    error: "Invalid username/password"
                });
            }
        })
        .catch((error) => {
            throw new Error('error');
        });
});

router.post('/check', (request, response) => {
    const token = request.body.token;
    const dataToken = verifyToken(token);
    response.send(dataToken);
});

module.exports = router;
