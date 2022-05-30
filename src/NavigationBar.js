import React from "react";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";

const NavigationBar = () => {
  const auth = useAuth();

  const isAuthenticated = auth?.user != null;

  const loggedInUser = isAuthenticated ? auth.user : null;
  const fullName = isAuthenticated
    ? `${loggedInUser.first_name} ${loggedInUser.last_name}`
    : "";

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
              <Link className='nav-link' to='/search'>
                Search
              </Link>
            )}
            {isAuthenticated && (
              <Link className='nav-link' to='/keywords'>
                Keywords
              </Link>
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
              <Link className='nav-link' to='/login'>
                Login
              </Link>
            )}
            {!isAuthenticated && (
              <Link className='nav-link' to='/register'>
                Register
              </Link>
            )}
          </Nav>
          {isAuthenticated && (
            <Navbar.Text>
              Signed in as: <b>{fullName}</b>
            </Navbar.Text>
          )}
        </Container>
      </Navbar>
    </Row>
  );
};

export default NavigationBar;
