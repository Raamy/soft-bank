import React, {Component} from "react";
import axios from 'axios';
import { connect } from 'react-redux'

class LastTransfer extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            lastsTransfer: '',
            usernames: []
        }
    }

    // Récupère les 5 derniers transferts de ce compte
    getLastsTransfer = () => {
        if(this.props.accountId !== null && this.props.accountId !== undefined){
            axios.get(`http://localhost:6565/transfer/history/last/${this.props.accountId}`)
                .then((response) => {
                    this.setState({lastsTransfer: response.data})
                })
        }
    };

    // Execute la fonction ci-dessus une fois l'id du compte récupéré
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.lastsTransfer === ''){
            this.getLastsTransfer();
        }
    }


    render() {
        // A Ignorer : CSS
        const tableDark = () => {
            if(this.props.theme !== null && this.props.theme === 'dark'){
                return 'table-dark'
            }
        };
        // Rendu des derniers transfert dans le tableau
        const tableTransfer = Object.keys(this.state.lastsTransfer).map((key) => {
            return(
                <tr key={key}>
                    <td scope="row">{this.state.lastsTransfer[key].sender}</td>
                    <td>{this.state.lastsTransfer[key].receiver}</td>
                    <td>{this.state.lastsTransfer[key].transfer_value} €</td>
                    <td>{this.state.lastsTransfer[key].transfer_date}</td>
                </tr>
            )
        });
        return (
            <div>
                <h3 className={'pt-2'}>Derniers transferts de ce compte</h3>
                <br/>
                {/* Tableau des 5 derniers transfert */}
                <table className={`table table-striped table-bordered ${tableDark()}`}>
                    <thead>
                    <tr>
                        <th scope="col">Emetteur</th>
                        <th scope="col">Destinataire</th>
                        <th scope="col">Montant</th>
                        <th scope="col">Date de transfert</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableTransfer}
                    </tbody>
                </table>
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
)(LastTransfer)