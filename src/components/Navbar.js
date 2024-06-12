import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavbarComponent = ({ account }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Decentralized Chat</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
        </Nav>
        <Navbar.Text>
          Signed in as: <a href="#login">{account}</a>
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
