import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (event) => {
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
            navigate('/items');
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
            <h1 className="mb-4">Login</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        ref={emailRef}
                        required
                        type="email"
                        placeholder="Email"
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
