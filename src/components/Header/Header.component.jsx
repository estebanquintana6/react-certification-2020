import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

import { useHistory } from 'react-router-dom';

function Header({ deAuthenticate, authenticated }) {
  const history = useHistory();

  const toFavorites = () => {
    history.push('/home/favorites');
  };

  const toHome = () => {
    history.push('/home');
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#" onClick={toHome}>
        Esteban&apos;s challange
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {authenticated && (
          <>
            <Nav className="mr-auto">
              <Nav.Link href="#" onClick={toFavorites}>
                My favorites
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#" onClick={deAuthenticate}>
                Logout
              </Nav.Link>
            </Nav>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
