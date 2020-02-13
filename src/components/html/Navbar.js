import React, {Component} from "react";
import './Html.css'
import {connect} from "react-redux"
import {setDark, setLight} from "../redux/themes/themeActions";
import {logOut} from "../redux/security/securityActions";

class Navbar extends Component {

    render() {
        // Bouton de changement de thème
        const button = () => {
            if(this.props.theme === 'light'){
                return(
                    <button onClick={this.props.setDark} type="button" className="btn btn-outline-dark"><i
                        className="far fa-moon"/></button>
                )
            }
            else{
                return(
                    <button onClick={this.props.setLight} type="button" className="btn btn-outline-light"><i
                        className="fas fa-sun" /></button>
                )
            }
        };
        // Affichage des onglets si l'utilisateur est connecté
        const navLinks = () => {
            if(this.props.isLogged === true){
                return(
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a className="nav-link" href="/">Accueil</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/comptes">Mes comptes</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/virements">Virements</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/transfert">Transfert</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/profil">Mon profil</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a href="/" onClick={this.props.logOut} className="nav-link"><i className="fas fa-power-off fa-2x"/></a>
                            </li>
                        </ul>
                    </div>
                )
            }
        };
        // Pareil ici
        const userHead = () => {
            if(this.props.isLogged === true){
                return(
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <span className="navbar-text">Connecté : {this.props.user}</span>
                        </li>
                    </ul>
                )
            }
        };
        return (
            <div className={'setShadow'}>
                <nav className={`navbar navbar-expand-lg brandFront navbar-${this.props.theme} bg-${this.props.theme}`}>
                    <a className="navbar-brand" href="/">SoftBank</a>
                    {button()}
                    {userHead()}
                </nav>
                <nav className={`navbar navbar-expand-lg navbar-${this.props.theme} bg-${this.props.theme}`}>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    {navLinks()}
                </nav>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        theme: state.themes.theme,
        isLogged: state.security.isLogged,
        user: state.security.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setLight: () => dispatch(setLight()),
        setDark: () => dispatch(setDark()),
        logOut: () => dispatch(logOut())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar)