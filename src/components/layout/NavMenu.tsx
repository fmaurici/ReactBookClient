import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-smnavbar-dark bg-dark border-bottom box-shadow mb-3">
                    <Container>
                        <NavbarBrand className="navbar-brand" style={{ color: '#00ffff' }} tag={Link} to="/">React Book Store</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2 " />
                        <Collapse className="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} style={{ color: '#00ffff' }} navbar>
                            <ul className="navbar-nav flex-grow-1">
                                <NavItem>
                                    <NavLink tag={Link} className="nav-link text text-light" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="nav-link text text-light" to="/bookList">Books</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
