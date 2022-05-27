import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn);

  useEffect(() => {
    setIsLoggedIn(props.isLoggedIn);
  }, [props.isLoggedIn]);

  /**
   * Show and hide navigation links based on authentication status of user
   * Logged in users will only have access to search, keywords and logout links
   */
  return (
    <Row>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand>Mass G-Search</Navbar.Brand>
          <Nav className='me-auto'>
            {isLoggedIn && (
              <Nav.Link>
                <Link to='/search'>Search</Link>
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link>
                <Link to='/keywords'>Keywords</Link>
              </Nav.Link>
            )}
            {isLoggedIn ? (
              <Nav.Link
                onClick={() => {
                  alert("Logging out...");
                }}
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link>
                <Link to='/login'>Login</Link>
              </Nav.Link>
            )}
            {!isLoggedIn && (
              <Nav.Link>
                <Link to='/register'>Register</Link>
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </Row>
  );
};

export default NavigationBar;
