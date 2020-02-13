import React, {Component} from "react";
import axios from "axios";

// Connexion à react-redux
import {connect} from 'react-redux'

// Composant pour que le banquier édite le compte
import EditAccount from "../html/EditAccount";

// 5 derniers transferts de ce compte
import LastTransfer from "../html/LastTransfer";

// ----- Page rendu de compte ------
class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accountName: '',
            account: '',
            balance: '',
            depositValue: '',
            depositMade: null
        };
    }

    // Récupération des détails d'un compte spécifique
    getAccountDetails() {
        fetch(`http://localhost:6565/account/${this.props.location.pathname.replace('/compte/id=', '')}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        account: result[0]
                    });
                    this.setState({
                        balance: result[0].balance
                    })
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    // Des que le composant Mount
    componentDidMount() {
        this.getAccountDetails();
    }

    getDepositValue = event => {
        this.setState({depositValue: event.target.value})
    };

    // A ignorer : CSS
    formDeposit() {
        if (this.state.depositValue !== '') {
            return 'success'
        } else {
            return 'danger'
        }
    }

    // Effectuer un dépôt sur le compte
    makeDeposit = event => {
        event.preventDefault();
        var balance = Number(this.state.balance);
        var deposit = Number(this.state.depositValue);
        var finalBalance = balance + deposit;
        axios.put(`http://localhost:6565/account/edit/deposit/${this.state.account.id}/${this.props.id}`, {
            balance: this.state.depositValue
        });
        this.setState({
            balance: finalBalance
        });
        this.setState({
            depositMade: true
        });
    };

    // Ferme l'alerte après le dépôt
    closeAlert = event => {
        event.preventDefault();
        this.setState({depositMade: null})
    };

    render() {
        // Renvoie le nouveau solde du compte après le dépôt
        const newBalance = () => {
            if (this.state.balance !== '' && this.state.depositValue > 0) {
                let balance = Number(this.state.balance);
                let deposit = Number(this.state.depositValue);
                return `${balance + deposit} €`;
            }
        };
        // Alerte qui indique que le dépôt à été effectué
        const depositMade = () => {
            if (this.state.depositMade === true) {
                const deposited = this.state.depositValue;
                return (
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Votre dépôt à été effectué</h4>
                        <p>{deposited}€ ont été ajouté sur votre compte</p>
                        <div className="text-center">
                            <button onClick={this.closeAlert} type="button" className="btn btn-success">Fermer</button>
                        </div>
                    </div>
                )
            }
        };
        // Permet au banquier d'éditer le compte
        const editAccount = () => {
            if (this.props.role === '1') {
                return (
                    <div>
                        <EditAccount accountId={this.state.account.id}/>
                        <br/>
                    </div>
                )
            }
        };
        // A ignorer = CSS
        const text = () => {
            if (this.props.theme !== null && this.props.theme === 'dark') {
                return 'text-white'
            }
        };
        return (
            <div className={'container'}>
                <h1 data-aos="fade-up" className={'pt-4'}>Compte : {this.state.account.name}</h1>
                {/* Informations */}
                <div className={'text-justify'}>
                    <p className="lead">
                        Solde actuel : {Number(this.state.balance)} €
                    </p>
                    <p className="lead">
                        Limite du solde négatif : {this.state.account.overdraft_value}
                    </p>
                    <a role="button" href="/virements" className="btn btn-outline-success">Réaliser un
                        virement</a>
                    <a role="button" href="/transfert" className="btn btn-outline-primary ml-3">Effectuer un transfert
                    </a>
                    <a className="btn btn-outline-info ml-3" href={`/historique/${this.state.account.id}`} role="button">Historique de ce compte</a>
                </div>
                <br/>
                <hr/>
                {/* Partie Editer le compte : Banquier */}
                {editAccount()}
                <br/>
                <hr/>
                {/* Dépôt d'argent */}
                <h3 className={"pt-2"}>Déposer de l'argent sur ce compte</h3>
                {/* Alerte qui se déclenche une fois le dépôt effectué */}
                {depositMade()}
                <div className="form-group">
                    <input type="number" className={`form-control ${text()} bg-${this.props.theme}`} id="inputDeposit"
                           onChange={this.getDepositValue}
                           value={this.state.depositValue} placeholder="Montant du dépôt (€)"/>
                </div>
                <p className="lead">Nouveau solde : {newBalance()}</p>
                <div className="text-center">
                    <button className={`btn btn-${this.formDeposit()}`}
                            onClick={this.makeDeposit}>Déposer
                    </button>
                </div>
                <hr/>
                {/* 5 derniers transfert concernant ce compte */}
                <LastTransfer accountId={this.state.account.id}/>
            </div>
        );
    }

}

// Récupération des informations de l'utilisateur
const mapStateToProps = state => {
    return {
        theme: state.themes.theme,
        mail: state.security.mail,
        user: state.security.user,
        name: state.security.name,
        id: state.security.id,
        role: state.security.role
    }
};

export default connect(
    mapStateToProps,
    null
)(Account)