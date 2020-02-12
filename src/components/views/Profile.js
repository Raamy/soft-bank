import React, {Component} from "react";
import {connect} from "react-redux"

class Profile extends Component {

    render() {
        // Rendu du profil
        const profil = () => {
            if(this.props.accounts !== null){
                return (
                    <div>
                        <p className="lead">
                            Nom : {this.props.name}
                        </p>
                        <p className="lead">
                            Pseudo : {this.props.user}
                        </p>
                        <p className="lead">
                            Mail : {this.props.mail}
                        </p>
                        <p className="lead">Nombre de compte : {this.props.accounts.length}</p>
                    </div>
                )
            }
        };
        return (
            <div>
                <h1 className={'text-center py-4'}>Mon profil</h1>
                <br/>
                {profil()}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        accounts: state.accounts.accounts,
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
)(Profile)