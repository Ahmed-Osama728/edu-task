import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">EduAct</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Sign in</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
