import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';



class Menu extends Component {
    logOut(e) {
        e.preventDefaut()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)

    }
    render() {
        const userLink = (
            <Nav>
                <Nav.Link >Log Out</Nav.Link>
                <Nav.Link eventKey={1} as={Link} to="/profile">
                    Sign up</Nav.Link>
            </Nav>
        )

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
                            <userLink />
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Menu