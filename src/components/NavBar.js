import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.jpg";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink exact activeClassName={styles.Active} to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              className="mr-3"
              to="/"
            >
              Home
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} className="mr-3" to="/signin">
              Sign in
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} className="mr-3" to="/signup">
              Sign up
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/contact">
              Contact
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;