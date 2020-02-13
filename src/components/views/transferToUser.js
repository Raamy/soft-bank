import React, {Component} from "react";
import {connect} from "react-redux";
import axios from 'axios'

class TransferToUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: '',
            users: '',
            amount: '',
            chosenAccount: '',
            chosenUserId: '',
            chosenUser: '',
            transfered: null
        }
    }

    // Récupère les comptes de l'utilisteur connecté
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.accounts === '' && this.props.accounts != null) {
            this.setState({accounts: this.props.accounts});
            fetch(`http://localhost:6565/user/others/${this.props.id}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        // console.log(result);
                        this.setState({
                            users: result
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

    // A ignorer : CSS
    completedForm() {
        if (this.state.chosenAccount === '' || this.state.chosenUser === '' || this.state.amount === '') {
            return 'danger'
        } else {
            return 'success'
        }
    }

    getChosenAccount = event =>{
        event.preventDefault();
        this.setState({chosenAccount: event.target.value})
    };

    getChosenUser = event => {
        event.preventDefault();
        var userId = event.target.value;
        // console.log(userId);
        axios.get(`http://localhost:6565/user/firstAccount/${userId}`)
            .then((response) => {
                this.setState({chosenUser: response.data.id});
                this.setState({chosenUserId: response.data.userid})
            })
    };

    getAmount = event => {
        event.preventDefault();
        this.setState({amount: event.target.value})
    };

    // Permet d'effectuer le transfert entre les deux comptes
    makeTransfer = event => {
        event.preventDefault();
        axios.put(`http://localhost:6565/account/edit/deposit/${this.state.chosenUserId}/${this.state.chosenUser}`, {
            balance: this.state.amount
        });
        axios.put(`http://localhost:6565/account/edit/deposit/${this.state.chosenAccount}/${this.props.id}`, {
            balance: -this.state.amount
        });
        axios.post(`http://localhost:6565/transfer/${this.state.chosenAccount}/${this.state.chosenUser}/${this.state.amount}`);
        this.setState({transfered: true})
    };

    closeAlert = event => {
        event.preventDefault();
        this.setState({transfered: null})
    };

    render() {
        // A ignorer = CSS
        const text = () => {
            if (this.props.theme !== null && this.props.theme === 'dark') {
                return 'text-white'
            }
        };
        // Rendu de la liste des comptes de l'utilisateur connecté
        const accounts = Object.keys(this.state.accounts).map((key) => {
            if(this.state.accounts[key].balance > 0){
                return (
                    <option value={this.state.accounts[key].id}>
                        {this.state.accounts[key].name}
                    </option>
                )
            }
        });
        // Rendu de la liste des utilisateurs (autre que celui connecté ...) dans la balise select
        const users = Object.keys(this.state.users).map((key) => {
            return(
                <option value={this.state.users[key].id}>
                    {this.state.users[key].name}
                </option>
            )
        });
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
        return (
            <div>
                <h1 className={'text-center py-4'}>Virements</h1>
                <br/>
                {doneTransfer()}
                <h4>Transferer de l'argent depuis :</h4>
                <br/>
                <select onChange={this.getChosenAccount} className={`form-control ${text()} bg-${this.props.theme}`}>
                    <option selected="selected">
                    </option>
                    {accounts}
                </select>
                <hr/>
                <h4>A l'utilisateur :</h4>
                <br/>
                <select onChange={this.getChosenUser} className={`form-control ${text()} bg-${this.props.theme}`}>
                    <option selected="selected">
                    </option>
                    {users}
                </select>
                <hr/>
                <h4>Montant :</h4>
                <br/>
                <input value={this.state.amount} onChange={this.getAmount}
                       type="number"
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
        accounts: state.accounts.accounts
    }
};

export default connect(
    mapStateToProps,
    null
)(TransferToUser)