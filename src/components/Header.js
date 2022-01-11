import React from 'react';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const { state, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const isLogged = state.isAuth === true;

    const handleLogout = () => {
        dispatch({ type: 'SET_AUTH', payload: false });
        navigate('/');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Blogger.
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!isLogged ? (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register">
                                    Register
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/items">
                                    Articles
                                </Nav.Link>
                                <NavDropdown
                                    title="Categories"
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item href="#action/3.1">
                                        PHP
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        JS
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">
                                        Python
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4">
                                        MongoDB
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                    {isLogged && (
                        <Nav>
                            <Nav.Link onClick={handleLogout}>
                                Deconnexion
                            </Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
