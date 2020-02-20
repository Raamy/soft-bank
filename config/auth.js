const jwt = require('jsonwebtoken');

const createToken = (payload) => {
    return jwt.sign(
        payload,
        'toto', {
        expiresIn: 3600,
        algorithm: "HS256"
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, 'toto'); // c'est la clé qui hash les données de login
};

// console.log(verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU29saWQiLCJlbWFpbCI6InNuYWtlZUBnbWFpbC5jb20iLCJsb2dpbiI6IlNuYWtlIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNTgxMzI2OTU1LCJleHAiOjE1ODEzMzA1NTV9.zyayHeU7NszRGQBjZKavmLjO9oHs2xTrTH-BKqPZfi0"));

module.exports = {
    createToken,
    verifyToken
};
