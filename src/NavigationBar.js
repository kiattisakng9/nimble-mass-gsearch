import React from "react";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";

const NavigationBar = (props) => {
  const auth = useAuth();

  const isAuthenticated = auth?.user != null;

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
            {isAuthenticated && (
              <Nav.Link>
                <Link to='/search'>Search</Link>
              </Nav.Link>
            )}
            {isAuthenticated && (
              <Nav.Link>
                <Link to='/keywords'>Keywords</Link>
              </Nav.Link>
            )}
            {isAuthenticated ? (
              <Nav.Link
                onClick={() => {
                  alert("Logging out...");
                  auth.signout();
                }}
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link>
                <Link to='/login'>Login</Link>
              </Nav.Link>
            )}
            {!isAuthenticated && (
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
