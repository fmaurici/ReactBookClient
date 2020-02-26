import React, { Component } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom';
import * as LoginStore from '../../store/shared/Login'
import { NavItem, NavLink, Navbar } from 'reactstrap';
import { ApplicationState } from '../../store';
import { connect } from 'react-redux';

type LoginProps =
    LoginStore.LoginState &
    typeof LoginStore.actionCreators &
    RouteComponentProps<{}>;

export class LoginPartial extends Component<LoginProps> {

    async componentDidMount() {
        this.props.IsSignedIn(this.props.user);
    }

    render() {
        return (
            <Navbar className="navbar-nav">
                {this.renderLoginLayout()}
            </Navbar>
        )
    }

    private renderLoginLayout() {
        if (this.props.isSignedIn) {
            return (
                <NavItem className="dropdown">
                    <NavLink className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-user fa-lg fa-fw"></i>{this.props.user.userName}
                    </NavLink>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <NavLink tag={Link} to={"/Administration/EditUser/" + this.props.user.id} className="dropdown-item">Profile</NavLink>
                        <div className="dropdown-divider"></div>
                        <NavLink tag={Link} to="/Account/LogOut/" className="dropdown-item">Log Out</NavLink>
                    </div>
                </NavItem>
            );
        }

        return (
            <React.Fragment>
                <NavItem>
                    <NavLink tag={Link} className="nav-link text text-light" to="/Account/Register">Register</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="nav-link text text-light" to="/Account/LogIn">LogIn</NavLink>
                </NavItem>
            </React.Fragment>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.logIn,
    LoginStore.actionCreators
)(LoginPartial as any);