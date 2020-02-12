import React, {Component} from "react";

// Redux
import {connect} from "react-redux"
import { userDataApi } from "./components/redux/security/securityActions";

// stylesheet
import './MainView.css'

// react-router-dom
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Navbar & Footer
import Navbar from "./components/html/Navbar";

// Import des Vues
import Profile from "./components/views/Profile";
import Home from "./components/views/Home";
import AllAccounts from "./components/views/AllAccounts";
import Account from "./components/views/Account";
import TransferToUser from "./components/views/transferToUser";
import TransferToAccount from "./components/views/transferToAccount";

class MainView extends Component {

    // Récupère les données de l'utilisateur s'il est connecté
    componentDidMount() {
        if (sessionStorage.getItem('token') != null) {
            this.props.userDataApi();
            console.log(this.props)
        }
    }

    render() {
        return (
            <div className={`changeFont ${this.props.theme}Background`}>
                <Navbar/>
                <div className={'route'}>
                    <Router>
                        <Switch>
                            <div className={`${this.props.theme}Theme`}>
                                <div className="container">
                                    <Route exact path='/' component={Home}/>
                                    <Route exact path='/accueil' component={Home}/>
                                    <Route exact path='/profil' component={Profile}/>
                                    <Route exact path='/comptes' component={AllAccounts} />
                                    <Route exact path='/compte/:id' component={Account}/>
                                    <Route exact path='/virements' component={TransferToUser} />
                                    <Route exact path='/transfert' component={TransferToAccount} />
                                </div>
                            </div>
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        theme: state.themes.theme
    }
};

const mapDispatchToProps = dispatch => {
    return {
        userDataApi: () => dispatch(userDataApi(dispatch))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainView)