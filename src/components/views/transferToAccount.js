import React, {Component} from "react";
import {connect} from 'react-redux'
import axios from "axios";

class TransferToAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: '',
            account_1: '',
            account_2: '',
            amount: '',
            transfered: null
        };
    }

    // Méthode pour fetch tous les comptes de l'utilisateurs connecté
    getAllAccounts() {
        if (this.state.accounts === '') {
            fetch(`http://localhost:6565/account/user/${this.props.id}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        // console.log(result);
                        this.setState({
                            accounts: result
                        });

                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        console.log(error);
                    }
                )
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.getAllAccounts();
    }

    getAccount1 = event => {
        event.preventDefault();
        this.setState({account_1: event.target.value})
    };

    getAccount2 = event => {
        event.preventDefault();
        this.setState({account_2: event.target.value})
    };

    getAmount = event => {
        event.preventDefault();
        this.setState({amount: event.target.value})
    };

    completedForm() {
        if (this.state.account_1 === '' || this.state.account_2 === '' || this.state.amount === '') {
            return 'danger'
        } else {
            return 'success'
        }
    }

    // Permet d'effectuer le transfert entre les deux comptes
    makeTransfer = event => {
        event.preventDefault();
        axios.put(`http://localhost:6565/account/edit/deposit/${this.state.account_2}/${this.props.id}`, {
            balance: this.state.amount
        });
        axios.put(`http://localhost:6565/account/edit/deposit/${this.state.account_1}/${this.props.id}`, {
            balance: -this.state.amount
        });
        this.setState({transfered: true})
    };

    // Ferme l'alerte, voir ci-dessous
    closeAlert = event => {
        event.preventDefault();
        this.setState({transfered: null})
    };

    render() {
        // Créé une alerte une fois le transfert effectué
        const doneTransfer = () => {
            if(this.state.transfered === true){
                return(
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Transfert programmé !</h4>
                        <p>Le transfert sera effectué d'ici quelques minutes...</p>
                        <button onClick={this.closeAlert} type="button" className="btn btn-success">Fermer</button>
                    </div>
                )
            }
        };
        // Permet de créer les listes des comptes dans les balises select
        const accounts = Object.keys(this.state.accounts).map((key) => {
            if(this.state.accounts[key].balance > 0){
                return (
                    <option value={this.state.accounts[key].id}>
                        {this.state.accounts[key].name}
                    </option>
                )
            }
        });
        // A ignorer = CSS
        const text = () => {
            if(this.props.theme !== null && this.props.theme === 'dark'){
                return 'text-white'
            }
        };
        return (
            <div>
                <div className={'container pt-4'}>
                    <h1 className={'text-center'}>Transfert</h1>
                    <br/>
                    {doneTransfer()}
                    <div className="form-group">
                        <h4>Transferer de l'argent depuis :</h4>
                        <br/>
                        {/*Balise Select du compte 1*/}
                        <select className={`form-control ${text()} bg-${this.props.theme}`} onChange={this.getAccount1}
                                value={this.state.account_1}>
                            <option selected="selected">
                            </option>
                            {accounts}
                        </select>
                        <hr/>
                        <h4>A :</h4>
                        <br/>
                        {/*Balise Select du compte 2*/}
                        <select className={`form-control ${text()} bg-${this.props.theme}`}
                                value={this.state.account_2} onChange={this.getAccount2}>
                            <option selected="selected">
                            </option>
                            {accounts}
                        </select>
                        <hr/>
                        <h4>Montant :</h4>
                        <br/>
                        <input value={this.state.amount} onChange={this.getAmount}
                               type="text"
                               className={`form-control ${text()} bg-${this.props.theme}`} id="inputMontant"
                               placeholder="Montant (€)"/>

                        <div className="text-center">
                            <button type="submit"
                                    className={`btn btn-outline-${this.completedForm()} text-center mt-4`}
                                    onClick={this.makeTransfer} data-toggle="modal"
                                    data-target="#staticBackdrop">Transférer
                            </button>
                        </div>
                    </div>
                </div>
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
        id: state.security.id
    }
};

export default connect(
    mapStateToProps,
    null
)(TransferToAccount)