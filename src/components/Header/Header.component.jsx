import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

function Header({ history, deAuthenticate, authenticated }) {
  const toFavorites = () => {
    history.push('/home/favorites');
  };

  const toLogin = () => {
    history.push('/login');
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
      <Navbar.Collapse id="responsive-navbar-nav" data-testid="action-container">
        {authenticated ? (
          <>
            <Nav className="mr-auto">
              <Nav.Link href="#" onClick={toFavorites} data-testid="to-favorites-button">
                My favorites
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#" onClick={deAuthenticate} data-testid="logout-button">
                Logout
              </Nav.Link>
            </Nav>
          </>
        ) : (
          <>
            <Nav className="mr-auto" />
            <Nav>
              <Nav.Link href="#" onClick={toLogin} data-testid="login-button">
                Login
              </Nav.Link>
            </Nav>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
