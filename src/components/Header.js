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

        localStorage.removeItem('accessToken');

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
                                <Nav.Link as={Link} to="/items/create">
                                    Créer un article
                                </Nav.Link>
                                <NavDropdown
                                    title="Categories"
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item
                                        as={Link}
                                        to="/items/categorie/php"
                                    >
                                        PHP
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={Link}
                                        to="/items/categorie/js"
                                    >
                                        JS
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={Link}
                                        to="/items/categorie/python"
                                    >
                                        Python
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={Link}
                                        to="/items/categorie/mongodb"
                                    >
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
