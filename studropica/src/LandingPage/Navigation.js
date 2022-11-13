// todo when navbar collapses bug with card item
import React from "react";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import "./Navigation.css";

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg" className="fixed-top">
      <Navbar.Brand href="#home">Studropica</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#shop">Shop</Nav.Link>

          <Nav.Link href="#stories">Stories</Nav.Link>

          <Nav.Link href="#about">About</Nav.Link>

          <Form id="form" className="me-5">
            <FormControl type="text" placeholder="Search" />
          </Form>
        </Nav>
        <Nav className="me-auto">
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
          <Navbar.Text>0</Navbar.Text>
          <Nav.Link href="#login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
