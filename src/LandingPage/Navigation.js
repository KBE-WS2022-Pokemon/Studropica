// todo when navbar collapses bug with card item
import React, { useContext, useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, NavDropdown } from "react-bootstrap";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080/auth",
  realm: "Studropica",
  clientId: "frontend_client",
  pkceMethod: 'S256'
});
//i want to create an a var which is accessible to all components

const handleLogin = () => {
  keycloak.login();
};


const Navigation = ({ cartCount }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    keycloak
      .init({
        onLoad: "check-sso",
        promiseType: "native",
      })
      .then((authenticated) => {
        setAuthenticated(authenticated);
      })
      .catch((error) => {
        console.error("Keycloak initialization failed", error);
      });
  }, []);
  return (
    <Navbar bg="light" expand="lg" className="fixed-top">
      <Navbar.Brand as={Link} to="/">
        Studropica
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <LinkContainer to="/shop">
            <Nav.Link>Shop</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/">
            <Nav.Link href="#about">About</Nav.Link>
          </LinkContainer>
          <Form id="form" className="me-5">
            <FormControl type="text" placeholder="Search" />
          </Form>
        </Nav>
        <Nav className="me-auto">
          <LinkContainer to="/cart">
            <Nav.Link href="#cart" id="test" className="ms-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </Nav.Link>
          </LinkContainer>
          {authenticated ? (
    <NavDropdown title={keycloak.tokenParsed.name}>
      <NavDropdown.Item onClick={keycloak.logout}>Logout</NavDropdown.Item>
    </NavDropdown>
  ) : (
    <Nav.Link href="#login" onClick={handleLogin}>
      Login
    </Nav.Link>
  )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
