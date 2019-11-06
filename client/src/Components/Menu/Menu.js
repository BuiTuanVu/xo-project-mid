import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { loginSuccess } from '../../Actions/authActions'
import setAuthToken from '../../Actions/setAuthToken'
import { connect } from 'react-redux';

class Menu extends Component {
    constructor(props) {
        super(props)
        this.logOut = this.logOut.bind(this)
    }

    logOut(e) {
        e.preventDefault();
        localStorage.removeItem("jwtToken");
        setAuthToken(false);

        this.props.loginSuccess({});
        this.props.history.push('/');

    }
    render() {
        const { user } = this.props

        return (
            <div>
                <Navbar collapseOnSelect variant="dark" expand="lg" id="menu-nav" style={{ backgroundColor: '#034E65' }}>
                    <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link}
                                to="/features">Features</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>

                        </Nav>
                        <Nav>
                            <NavDropdown title={user.user.username} id="collasible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/home/profile/">Profile</NavDropdown.Item></NavDropdown>
                            <Nav.Link eventKey={1} onClick={this.logOut}>
                                Logout</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({

    loginSuccess: (data) => dispatch(loginSuccess(data)),
});

const mapStateToProps = state => ({
    user: state.auth.user
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))