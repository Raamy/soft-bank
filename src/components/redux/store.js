import {createStore} from "redux";

// On importe tous les reducers
import rootReducer from "./rootReducer";

const store = createStore(
    rootReducer,
    // Extension react-redux pour navigateur
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;