import { EDIT_ACCOUNT } from "./accountsTypes";

import axios from 'axios';

export const deleteAccount = (id) => {
    return {
        type: 'DELETE_ACCOUNT',
        payload: {
            id: id
        }
    }
};

export const editAccount = (accountId, userId, body) => {
    axios.put(`http://localhost:6565/account/edit/${accountId}/${userId}`, body);
    return {
        type: EDIT_ACCOUNT
    }
};