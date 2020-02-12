import React, {Component} from "react";
import axios from "axios";
import {connect} from 'react-redux'
import {userDataApi} from "../redux/security/securityActions";

// Composant pour que le banquier édite le compte
import EditAccount from "../html/EditAccount";

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
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                }
            )
    }

    componentDidMount() {
        this.getAccountDetails();
    }

    getDepositValue = event => {
        this.setState({depositValue: event.target.value})
    };

    formDeposit() {
        if (this.state.depositValue !== '') {
            return 'success'
        } else {
            return 'danger'
        }
    }

    // Effectuer un dépôt sur le compte
    makeDeposit =  event => {
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
            if(this.props.theme !== null && this.props.theme === 'dark'){
                return 'text-white'
            }
        };
        return (
            <div className={'container'}>
                <h1 data-aos="fade-up" className={'pt-4'}>Compte : {this.state.account.name}</h1>
                {/*<hr/>*/}
                <div className={'text-justify'}>
                    <p className="lead">
                        Solde actuel : {Number(this.state.balance)} €
                    </p>
                    <p className="lead">
                        Limite du solde négatif : {this.state.account.overdraft_value}
                    </p>
                    <a role="button" href="/virements" className="btn btn-success">Réaliser un
                        virement</a>

                    <a role="button" href="/transfert" className="btn btn-outline-success">Effectuer un transfert
                    </a>
                </div>
                <br/>
                <hr/>
                {editAccount()}
                <br/>
                <hr />
                <h3 className={"pt-2"}>Déposer de l'argent sur ce compte</h3>
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
                <hr />
                <h3 className={'pt-2'}>Derniers transferts de ce compte</h3>
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
        id: state.security.id,
        role: state.security.role
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
)(Account)