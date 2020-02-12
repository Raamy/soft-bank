import {combineReducers} from "redux";
import themeReducer from "./themes/themeReducer"
import securityReducer from "./security/securityReducer";
import accountsReducer from "./accounts/accountsReducer";

const rootReducer = combineReducers({
    themes: themeReducer,
    security: securityReducer,
    accounts: accountsReducer
});

export default rootReducer;