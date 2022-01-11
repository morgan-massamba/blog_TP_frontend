import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChange = ({ target: { value, name } }) => {
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleChangeConfirmPassword = ({ target: { value } }) => {
        setConfirmPassword(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setValidated(true);

        //On vérifie si les inputs ont bien été validés
        if (
            usernameRef?.current?.validity?.valid === false ||
            emailRef?.current?.validity?.valid === false ||
            passwordRef?.current?.validity?.valid === false ||
            confirmPasswordRef?.current?.validity?.valid === false ||
            user.password !== confirmPassword
        ) {
            return;
        }

        try {
            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error(' Error!', {
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
            <h1 className="mb-4">Register</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        ref={usernameRef}
                        required
                        type="text"
                        placeholder="Username"
                        onChange={handleChange}
                        value={user.username}
                        name="username"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please choose a username.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        required
                        ref={emailRef}
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
                        Please choose a password.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password confirmation</Form.Label>
                    <Form.Control
                        required
                        ref={confirmPasswordRef}
                        type="password"
                        placeholder="Password confirmation"
                        value={confirmPassword}
                        isInvalid={
                            confirmPassword && user.password !== confirmPassword
                        }
                        onChange={handleChangeConfirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter the same password.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </>
    );
};

export default RegisterPage;
