import React, {Component} from "react";
import axios from 'axios';
import {connect} from "react-redux"

class Register extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            mail: '',
            login: '',
            dateOfBirth: '',
            password: '',
            register: 'null'
        };
    }

    // Créer un utilisateur lors de la validation du formulaire
    createUser = event => {
        axios.post(`http://localhost:6565/user/add`, {
            name: this.state.name,
            surname: this.state.surname,
            mail: this.state.mail,
            login: this.state.login,
            dateOfBirth: this.state.dateOfBirth,
            password: this.state.password
        })
            .then(response => {
                console.log(response);
                this.setState({
                    register: 'success'
                })
            })
            .catch(error => {
                console.log('Erreur : ' + error.response)
            });
    };

    getNom = event => {
        event.preventDefault();
        this.setState({
            name: event.target.value
        })
    };

    getSurname = event => {
        event.preventDefault();
        this.setState({
            surname: event.target.value
        })
    };

    getEmail = event => {
        event.preventDefault();
        this.setState({
            mail: event.target.value
        })
    };

    getBirthDate = event => {
        event.preventDefault();
        this.setState({
            dateOfBirth: event.target.value
        })
    };

    getLogin = event => {
        event.preventDefault();
        this.setState({
            login: event.target.value
        })
    };

    getPassword = event => {
        event.preventDefault();
        this.setState({
            password: event.target.value
        })
    };

    // Ferme l'alerte lors de l'inscription
    closeAlert = event => {
        event.preventDefault();
        this.setState({register: null})
    };

    render() {
        // Lance une alerte après l'inscription
        const registerAlert = () => {
            if (this.state.register === 'success') {
                return (
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Vous êtes inscrit!</h4>
                        <p>Connectez-vous pour voir vos comptes et utiliser nos services</p>
                        <button onClick={this.closeAlert} type="button" className="btn btn-success">Continuer</button>
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
            <div>
                <h2 data-aos="fade-down" className={"text-center pt-4"}>Inscription</h2>
                <br/>
                {registerAlert()}
                <br/>
                <p>Première connexion?</p>
                {/*Formulaire d'inscription*/}
                <div  className="form-group">
                    <input onChange={this.getNom} type="text" className={`form-control ${text()} bg-${this.props.theme}`}
                           value={this.state.name}
                           placeholder="Nom"/>
                </div>
                <div className="form-group">
                    <input onChange={this.getSurname} data-aos-duration="500" type="text"
                           className={`form-control bg-${this.props.theme}`}
                           value={this.state.surname} placeholder="Prénom"/>
                </div>
                <div className="form-group">
                    <input onChange={this.getEmail} type="email" className={`form-control ${text()} bg-${this.props.theme}`}
                           value={this.state.mail}
                           placeholder="Email"/>
                </div>
                <div className="form-group text-justify">
                    <label htmlFor={"inputBirth"}>Date de naissance :</label>
                    <input onChange={this.getBirthDate} type="date" className={`form-control ${text()} bg-${this.props.theme}`}
                           value={this.state.dateofbirth}
                           placeholder="Date de naissance"/>
                </div>
                <div className="form-group">
                    <input type="text" onChange={this.getLogin} className={`form-control ${text()} bg-${this.props.theme}`}
                           value={this.state.login}
                           placeholder="Login"/>
                </div>
                <div className="form-group">
                    {/*<label htmlFor="inputPassword">Password</label>*/}
                    <input onChange={this.getPassword} type="password" className={`form-control ${text()} bg-${this.props.theme}`}
                           value={this.state.password}
                           placeholder="Mot de passe"/>
                </div>
                <div className="text-center">
                    <button onClick={event => this.createUser()} className="btn btn-success">Inscription</button>
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

export default connect(
    mapStateToProps,
    null
)(Register)