import React, { useContext, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../components/AuthProvider';

const LoginPage = () => {
    const [validated, setValidated] = useState(false);
    const { dispatch } = useContext(AuthContext);
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleChange = ({ target: { value, name } }) => {
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setValidated(true);

        //On vérifie si les inputs ont bien été validés
        if (
            passwordRef?.current?.validity?.valid === false ||
            emailRef?.current?.validity?.valid === false
        ) {
            return;
        }

        try {
            const { data } = await axios.post(
                'http://localhost:3000/auth/login',
                user
            );

            const token = data?.token;

            if (token) {
                localStorage.setItem('accessToken', JSON.stringify(token));
            }

            dispatch({ type: 'SET_AUTH', payload: true });

            navigate('/items');
        } catch (error) {
            const errorMessage = error.response.data.message
                ? error.response.data.message
                : error.message;
            toast.error(errorMessage, {
                position: 'bottom-center',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    return (
        <>
            <h1 className="mb-4">Login</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        ref={emailRef}
                        required
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={user.email}
                        name="email"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email adress.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        ref={passwordRef}
                        required
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={user.password}
                        name="password"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter your password.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Connection
                </Button>
            </Form>
        </>
    );
};

export default LoginPage;
