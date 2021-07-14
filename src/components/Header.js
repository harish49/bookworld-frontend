import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
const Header = () => {
  const alreadyLoggedIn = useSelector((state) => state.userLogin);
  let { userInformation } = alreadyLoggedIn;

  const dispatch = useDispatch();
  const userLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    console.log("logged out");
  };

  return (
    <header>
      <Navbar className="py-3" bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Book e-commerce</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInformation ? (
                <NavDropdown title={userInformation.userName} id="userName">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Update Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/Myorders">
                    <NavDropdown.Item>My orders</NavDropdown.Item>
                  </LinkContainer>
                  {userInformation.userName === "admin" ? (
                    <LinkContainer to="/users">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  ) : (
                    ""
                  )}
                  {userInformation.userName === "admin" ? (
                    <LinkContainer to="/books">
                      <NavDropdown.Item>Books</NavDropdown.Item>
                    </LinkContainer>
                  ) : (
                    ""
                  )}
                  <NavDropdown.Item onClick={userLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
