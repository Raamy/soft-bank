import {GET_ACCOUNT} from "./accountsTypes";

const accountsState = {
    accounts: null
};

const accountsReducer = function (state = accountsState, action) {
    switch (action.type) {
        case GET_ACCOUNT:
            return Object.assign({}, state, {
                accounts: action.payload
            });
        case 'RECEIVE_ACCOUNT':
            return Object.assign({}, state, {
                accounts: action.payload
            });
        case 'DELETE_ACCOUNT':
            return Object.assign({}, state, {
                accounts: state.accounts.splice(action.payload.id, 1)
            });
        default:
            return state
    }
};

export default accountsReducer;