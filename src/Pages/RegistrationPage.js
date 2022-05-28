import React, { useRef } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";

const RegistrationPage = () => {
  const auth = useAuth();

  // References to form inputs
  const inputFirstName = useRef("");
  const inputLastName = useRef("");
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
    const trimmedFirstName = inputFirstName.current.trim();
    const trimmedLastName = inputLastName.current.trim();
    const trimmedEmail = inputEmail.current.trim();
    const trimmedPassword = inputPassword.current.trim();

    const newUserInfo = {
      first_name: trimmedFirstName,
      last_name: trimmedLastName,
      email: trimmedEmail,
      password: trimmedPassword,
    };

    auth.registerUser(newUserInfo);
  };

  return (
    <div>
      <Row>
        <Container className='App'>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='firstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type='text'
                name='firstName'
                placeholder='Enter first name'
                onChange={(evt) => handleOnChangeInputs(evt, inputFirstName)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='lastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type='text'
                name='lastName'
                placeholder='Enter last name'
                onChange={(evt) => handleOnChangeInputs(evt, inputLastName)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type='email'
                name='email'
                placeholder='Enter email'
                onChange={(evt) => handleOnChangeInputs(evt, inputEmail)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type='password'
                name='password'
                placeholder='Password'
                minLength={8}
                onChange={(evt) => handleOnChangeInputs(evt, inputPassword)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Container>
      </Row>
    </div>
  );
};

export default RegistrationPage;
