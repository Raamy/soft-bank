const jwt = require('jsonwebtoken');

const createToken = (payload) => {
    return jwt.sign({
        payload,
    }, 'toto', {
        expiresIn: 3600,
        algorithm: "HS256"
    });
}

const verifyToken = (token) => {
    return new Promise(
        (resolve, reject) => jwt.verify(token, 'toto', (err, decodedToken) => {
            if(err || !decodedToken) reject(err);
            resolve(decodedToken);
        })
    );
}

module.exports = {
    createToken,
    verifyToken
}