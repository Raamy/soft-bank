import {LOGIN, LOGOUT, RECEIVE_USER} from "./securityTypes";

import axios from 'axios'

// ----- Connexion -----
const logUser = (data, dispatch) => {
    var response = JSON.parse(data);
    // alert(typeof response);
    // alert(response.data.token);
    sessionStorage.setItem('token', response.data.token);
    dispatch(userDataApi(dispatch));
    return {
        type: LOGIN,
        payload: data
    }
};


export const login = (email, password, dispatch) => {
    const data = {email, password};
    axios.post(`http://localhost:6565/login`, {
        email: data.email,
        password: data.password
    })
        .then(response => JSON.stringify(response))
        .then(data => dispatch(logUser(data, dispatch)));
    return {
        type: "REQUEST_LOGIN",
        payload: {}
    }
};

// ----- Données utilisateur -----

export const userDataApi = (dispatch) => {
    var token = sessionStorage.getItem('token').toString();
        axios.post(`http://localhost:6565/login/check`, {
            token: token
        })
            .then(response => {
                // console.log(response.data);
                dispatch(getUserData(response.data));
                dispatch(getAccount(response.data.id, dispatch))
            });
    return {
            type: 'API_USER_CALL'
    }
};

const getUserData = (data) => {
    // console.log(data);
    return {
        type: RECEIVE_USER,
        payload: data
    }
};

export const getAccount = (id, dispatch) => {
    fetch(`http://localhost:6565/account/user/${id}`)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                dispatch(receiveAccount(result))
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log(error);
            }
        );
    return {
        type: 'GET_ACCOUNT'
    }
};

const receiveAccount = (data) => {
    return {
        type: 'RECEIVE_ACCOUNT',
        payload: data
    }
};

// ----- Déconnexion -----
export const logOut = () => {
    sessionStorage.removeItem('token');
    return {
        type: LOGOUT,
        payload: {}
    }
};