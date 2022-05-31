import React, { useRef } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

import { useAuth } from "../Contexts/AuthContext";

const LoginPage = () => {
  const auth = useAuth();

  // References to email and password inputs
  const inputEmail = useRef("");
  const inputPassword = useRef("");

  // Update email reference on input change
  const handleOnChangeInputs = (evt, reference) => {
    const value = evt.target.value;

    // Update value
    reference.current = value;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Trim values
    const trimmedEmail = inputEmail.current.toString().trim();
    const trimmedPassword = inputPassword.current.toString().trim();

    const loginCredentials = {
      email: trimmedEmail,
      password: trimmedPassword,
    };

    auth.signin(loginCredentials);
  };

  return (
    <div>
      <Container className='mx-auto forms-container'>
        <Row className='mb-5 mt-5'>
          <Col md={12}>
            <h3>Login</h3>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-4' controlId='email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type='email'
              name='email'
              placeholder='Enter email'
              onChange={(evt) => handleOnChangeInputs(evt, inputEmail)}
            />
          </Form.Group>
          <Form.Group className='mb-4' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type='password'
              name='password'
              placeholder='Password'
              onChange={(evt) => handleOnChangeInputs(evt, inputPassword)}
            />
          </Form.Group>
          <Button variant='primary' type='submit' className='mb-5'>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default LoginPage;
