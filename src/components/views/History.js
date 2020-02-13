import React, { Component } from "react";
import { connect } from 'react-redux'

class History extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            transfers: ''
        }
    }

    // Récupération des détails d'un compte spécifique
    getTransferDetails() {
        fetch(`http://localhost:6565/transfer/account/${this.props.location.pathname.replace('/historique/', '')}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        transfers: result
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    componentDidMount() {
        this.getTransferDetails();
    }

    render() {
        // A Ignorer : CSS
        const tableDark = () => {
            if(this.props.theme !== null && this.props.theme === 'dark'){
                return 'table-dark'
            }
        };
        // Retourne les données du tableau (Historique des transferts)
        const tableTransfer = Object.keys(this.state.transfers).map((key) => {
            return(
                <tr key={key}>
                    <td scope="row">{this.state.transfers[key].sender}</td>
                    <td>{this.state.transfers[key].receiver}</td>
                    <td>{this.state.transfers[key].transfer_value} €</td>
                    <td>{this.state.transfers[key].transfer_date}</td>
                </tr>
            )
        });
        return (
            <div>
                <h1 className="text-center py-4">Historique des transactions</h1>
                <br/>
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
        theme: state.themes.theme
    }
};

export default connect(
    mapStateToProps,
    null
)(History)