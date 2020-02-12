import {LOGIN, LOGOUT, RECEIVE_USER} from "./securityTypes";

const logged = () => {
    return sessionStorage.getItem('token') !== null;
};

// State initial d'un compte
const securityState = {
    isLogged: logged(), name: null, login: null, mail: null, role: null, user: null, id: null
};

const securityReducer = function (state = securityState, action) {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                isLogged: true,
                user: null,
                login: action.payload
            });
        case LOGOUT:
            return Object.assign({}, state, {
                isLogged: false,
                user: null
            });
        case RECEIVE_USER:
            return Object.assign({}, state, {
                isLogged: true,
                name: action.payload.name,
                login: action.payload,
                mail: action.payload.email,
                role: action.payload.role,
                user: action.payload.login,
                id: action.payload.id
            });
        default:
            return state;
    }
};

export default securityReducer;