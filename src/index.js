import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';

// Redux & React-Redux
import {createStore} from "redux";
import {Provider} from "react-redux";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// Vue principale
import MainView from "./MainView";

// Utilisation de Redux et du Store dans toute l'application
import rootReducer from "./components/redux/rootReducer";
const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Rendu de l'application
ReactDOM.render(<Provider store={store}>
    <MainView/>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
