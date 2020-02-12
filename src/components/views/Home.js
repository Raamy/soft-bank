import React, {Component} from "react";
import { connect } from 'react-redux'

import SecurityContainer from "../containers/SecurityContainer";

class Home extends Component {

    render() {
        const loginAndHome = () => {
          if(this.props.isLogged === false){
              return(
                  <SecurityContainer/>
              )
          }
          else {
              if(this.props.accounts !== null){
                  return(
                      <div>
                          <h1 className={'text-center py-4'}>Vous êtes connecté</h1>
                          <br/>
                          <h3>Que voulez-vous faire?</h3>
                          <br/>
                          <p className="lead">Voir l'état de mes {this.props.accounts.length} comptes</p>
                          <a className="btn btn-success" href="/comptes" role="button">Synthèse de mes comptes</a>
                          <br/>
                          <br/>
                          <p className="lead">Effectuer un virement</p>
                          <a role="button" href="/virements" className="btn btn-success">Virement</a>
                          <br/>
                          <br/>
                          <p className="lead">Effectuer un transfert</p>
                          <a className="btn btn-success" href="/transfert" role="button">Transfert</a>
                      </div>
                  )
              }
          }
        };
        return (
            <div>
                {loginAndHome()}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLogged: state.security.isLogged,
        name: state.security.name,
        accounts: state.accounts.accounts
    }
};

export default connect(
    mapStateToProps,
    null
)(Home)