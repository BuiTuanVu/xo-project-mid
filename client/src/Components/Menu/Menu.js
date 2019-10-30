import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';



class Menu extends Component {
    constructor(props) {
        super(props)
        this.logOut = this.logOut.bind(this)
    }

    logOut(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.history.push('/');

    }
    render() {


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
                            <Nav.Link as={Link} to="/login">Profile</Nav.Link>
                            <Nav.Link eventKey={1} onClick={this.logOut}>
                                Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Menu