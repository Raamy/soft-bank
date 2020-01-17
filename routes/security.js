const express = require('express');
const createToken = require('../config/auth').createToken;
const { pool } = require('../config/db');

const router = express.Router();


const getUsers = (email, password) => {
    return pool.query('SELECT * FROM user_user WHERE email = $1 AND password = $2', [mail, password])
        .then(response => response.rows);
};

router.post('/token', (request, response) => {
    const email = request.body.mail;
    const password = request.body.password;

    getUsers(email, password)
        .then((user_user) => {
            if (user_user.length === 1) {
                const token = createToken({
                    id: user_user.id
                });
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

module.exports = router;