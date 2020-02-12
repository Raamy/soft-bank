import React, {Component} from "react";
import {connect} from 'react-redux'
import { editAccount } from "../redux/accounts/accountsActions";

class EditAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            balance: '',
            overdraft_value: ''
        }
    }

    handleKeyUp = (event, field) => {
        const input = event.currentTarget;
        this.setState({
            [field]: input.value
        });
    };

    handleEditAccount = (event) => {
        event.preventDefault();
        this.props.editAccount(this.props.accountId, this.props.id, this.state)
        window.location.reload();
    };

    formDeposit() {
        if (this.state.name !== '' && this.state.balance !== '' && this.state.overdraft_value !== '') {
            return 'success'
        } else {
            return 'danger'
        }
    }

    render() {
        // A ignorer = CSS
        const text = () => {
            if(this.props.theme !== null && this.props.theme === 'dark'){
                return 'text-white'
            }
        };
        return (
            <div>
                <h3>Editer le compte</h3>
                <br/>
                <form onSubmit={this.handleEditAccount} action="">
                    <div className="form-group">
                        <input type="text" className={`form-control mt-3 ${text()} bg-${this.props.theme}`}
                               onKeyUp={(event) => this.handleKeyUp(event, "name")}
                               value={this.state.depositValue} placeholder="Nom du compte"/>
                    </div>
                    <div className="form-group">
                        <input type="number" className={`form-control mt-3 ${text()} bg-${this.props.theme}`}
                               onKeyUp={(event) => this.handleKeyUp(event, "balance")}
                               value={this.state.depositValue} placeholder="Montant du dépôt (€)"/>
                    </div>
                    <div className="form-group">
                        <input type="number" className={`form-control mt-3 ${text()} bg-${this.props.theme}`}
                               onKeyUp={(event) => this.handleKeyUp(event, "overdraft_value")}
                               value={this.state.depositValue} placeholder="Limite du solde négatif (€)"/>
                    </div>
                        <div className="text-center">
                            <button type="submit" className={`btn btn-${this.formDeposit()}`}>Editer
                            </button>
                        </div>
                </form>
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
        editAccount: (accountId, userId, body) => dispatch(editAccount(accountId, userId, body))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditAccount)