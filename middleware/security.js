const verifyJWTToken = require('../config/auth').verifyToken;

const verifyToken = (request, response, next) => {

    if (request.path === '/token' && request.path === 'register') {
        next();
    }
    else {
        const auth = request.get('Authorization');


        if (!auth || !auth.startsWith('Bearer '))
            response.sendStatus(401);
        else {
            verifyJWTToken(auth.replace('Bearer ', ''))
                .then((decodedToken) => {
                    request.user = decodedToken;
                    next();
                })
                .catch((error) => {
                    response.status(400).send({
                        error: 'JWT Token invalid',
                        details: error
                    });
                });
        }
    }
};

module.exports = {
    verifyToken
};