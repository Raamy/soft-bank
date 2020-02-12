import React, {Component} from "react";

import {connect} from 'react-redux'
import {deleteAccount} from "../redux/accounts/accountsActions";

import axios from 'axios';

// Création d'un compte
import CreateAccount from "../html/CreateAccount";

class AllAccounts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: '',
            deleted: null
        };
    }

    // Suppression d'un compte pour le banquier
    deleteAccount = (key, accountId, event) => {
        event.preventDefault();
        this.props.deleteAccount(key);
        axios.delete(`http://localhost:6565/account/delete/${accountId}`, this.props.id)
            .then(response => console.log(response));
        this.setState({deleted: true})
    };

    // Charge les comptes de l'utilisateur dans ce composant
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.accounts === '' && this.props.accounts != null){
            this.setState({accounts: this.props.accounts})
        }
    }

    // Ferme l'alerte, voir ci-dessous
    closeAlert = event => {
        event.preventDefault();
        this.setState({deleted: null})
    };

    // ----- CSS si le compte est négatif -----
    isOverdraft = (key) => {
        if(this.state.accounts[key].balance <= this.state.accounts[key].overdraft_value){
            return 'bg-danger'
        }
    };
    isNegative = (key) => {
        if(this.state.accounts[key].balance < 0 && this.state.accounts[key].balance > this.state.accounts[key].overdraft_value){
            return 'text-danger font-weight-bold'
        }
    };
   // ------------------------------------------

    render() {
        // Bouton pour supprimer le compte
        const deleteThisAccount = (key, id) => {
            if (this.props.role === '1') {
                return (
                    <button onClick={event => this.deleteAccount(key, id, event)} className="btn btn-danger"><i className="fas fa-times"/></button>
                )
            }
        };
        // Renvoie une alerte dès qu'un compte est supprimé
        const deletedAccount = () => {
            if(this.state.deleted === true){
                return(
                    <div className="alert alert-danger" role="alert">
                        <h4 className="alert-heading">Le compte à été supprimé!</h4>
                        <button onClick={this.closeAlert} type="button" className="btn btn-danger">Fermer</button>
                    </div>
                )
            }
        };
        const contactBanker = (key) => {
            if(this.state.accounts[key].balance < this.state.accounts[key].overdraft_value){
                return(
                    <p className="lead">
                        Veuillez contacter votre banquier référent.
                    </p>
                )
            }
        };
        // Rendu de liste des comptes
        const accounts = Object.keys(this.state.accounts).map((key) => {
            return (
                <div className={"pt-4"}>
                    <div style={{borderRadius: '0rem'}} key={key} className={`card ${this.isOverdraft(key)}`}>
                        <div className={`card-body ${this.props.theme}`}>
                            <div className="row">
                                <div className="col">
                                    <div className="float-right">{deleteThisAccount(key, this.state.accounts[key].id)}</div>
                                    <div className={'text-justify'}>
                                        <p style={{fontSize: '22px'}}>{this.state.accounts[key].name} <i
                                            className="fas fa-money-check"/></p>
                                        <p>
                                            <span className="lead">Solde </span> : <span className={this.isNegative(key)}>{this.state.accounts[key].balance}</span> €
                                        </p>
                                        <p className="lead">Limite du solde négatif : {this.state.accounts[key].overdraft_value}</p>
                                        {contactBanker(key)}
                                    </div>
                                    <div className="col">
                                        <a className="btn btn-success float-right"
                                           href={`/compte/id=${this.state.accounts[key].id}`} role="button">Détail du
                                            compte</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
        // Rendu HTML pour le banquier pour créer les comptes
        const createAccount = () => {
            if (this.props.role === '1' && this.props.accounts != null) {
                return (
                    <div>
                        <CreateAccount/>
                        <br/>
                    </div>
                )
            }
        };
        return (
            <div>
                <h1 className="text-center py-4">
                    Synthèse de mes comptes
                </h1>
                {createAccount()}
                <br/>
                {deletedAccount()}
                <br/>
                {accounts}
                <br/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        theme: state.themes.theme,
        mail: state.security.mail,
        user: state.security.user,
        name: state.security.name,
        role: state.security.role,
        id: state.security.id,
        accounts: state.accounts.accounts
    }
};

const mapDispatchToProps = dispatch => {
    return {
        deleteAccount: (id) => dispatch(deleteAccount(id))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllAccounts)