import React, {Component} from "react";
import { connect } from 'react-redux'
import axios from 'axios'
import {getAccount} from "../redux/security/securityActions";

class CreateAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            balance: '',
            overdraft_value: ''
        }
    }

    getName = event => {
        event.preventDefault();
        this.setState({name: event.target.value});
    };

    getBalance = event => {
        event.preventDefault();
        this.setState({balance: event.target.value});
    };

    getOverdraftValue = event => {
        event.preventDefault();
        this.setState({overdraft_value: event.target.value})
    };

    createNewAccount = event => {
        axios.post(`http://localhost:6565/account/add`, {
            name: this.state.name,
            userid: this.props.id,
            balance: this.state.balance,
            overdraft_value: this.state.overdraft_value
        });
        this.props.getAccount(this.props.id);
        this.setState({accounts: this.props.accounts})
    };

    // A ignorer = CSS
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
                <h4 className={'text-center'}>Créer un compte</h4>
                <br/>
                <form action="">
                    <div className="form-group">
                        <input onChange={this.getName} type="text" className={`form-control ${text()} bg-${this.props.theme}`}
                               placeholder="Nom"/>
                    </div>
                    <div className="form-group">
                        <input onChange={this.getBalance} type="number" className={`form-control ${text()} bg-${this.props.theme}`}
                               placeholder="Solde de départ"/>
                    </div>
                    <div className="form-group">
                        <input onChange={this.getOverdraftValue} type="number" className={`form-control ${text()} bg-${this.props.theme}`}
                               placeholder="Solde négatif max"/>
                    </div>
                    <div className="text-center">
                        <button type={'submit'} onClick={this.createNewAccount} className={`btn btn-${this.formDeposit()}`}>Créer</button>
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
        id: state.security.id
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAccount: (id) => dispatch(getAccount(id, dispatch))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(CreateAccount)