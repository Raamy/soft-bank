import React, {Component} from "react";

// Inscription & Connexion
import Register from "../html/Register";
import Login from "../html/Login";

class SecurityContainer extends Component {

    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-sm pt-4"}>
                        <Login onSubmit={this.handleSubmit}/>
                    </div>
                    <div className={"col-sm pt-4"}>
                        <Register/>
                    </div>
                </div>
            </div>
        );
    }

}

export default SecurityContainer;