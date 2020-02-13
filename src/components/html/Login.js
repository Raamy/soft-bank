import React, {Component} from "react";
import {connect} from "react-redux";
import {login} from "../redux/security/securityActions";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            role: ''
        };
    }

    getLogin = event => {
        event.preventDefault();
        this.setState({email: event.target.value});
    };

    getPassword = event => {
        event.preventDefault();
        this.setState({password: event.target.value})
    };

    handleLogin = event => {
        event.preventDefault();
        this.props.login(this.state.email, this.state.password);
    };

    render() {
        // A ignorer = CSS
        const text = () => {
            if(this.props.theme !== null && this.props.theme === 'dark'){
                return 'text-white'
            }
        };
        return (
            <div>
                <h2 className={"text-center pt-4"}>Connexion</h2>
                <br/>
                <br/>
                <p>Déjà inscrit?</p>
                <form onSubmit={this.handleLogin}>
                    <div className="form-group">
                        <input type="email" required className={`form-control ${text()} bg-${this.props.theme}`}
                               onChange={this.getLogin}
                               value={this.state.email} id="inputLogin" placeholder="Login"/>
                    </div>
                    <div className="form-group">
                        <input type="password" required className={`form-control ${text()} bg-${this.props.theme}`}
                               onChange={this.getPassword}
                               value={this.state.password} id="inputPassword" placeholder="Mot de passe"/>
                    </div>
                    <div className="text-center pt-3">
                        <button type='submit'
                                className="btn btn-primary text-center">Connexion
                        </button>
                    </div>
                </form>
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
        login: (email, password) => dispatch(login(email, password, dispatch))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);