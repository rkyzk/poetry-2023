import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import logo from "../assets/media/poems-logo.png";

/**
 *  Render the first navbar on top right.
 */
const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink exact to="/">
          <Navbar.Brand className={styles.Logo}>
            <img src={logo} alt="logo" />
          </Navbar.Brand>
        </NavLink>
        <h1 className="mt-4">Your Poetry</h1>
        <Navbar.Toggle aria-controls="basic-navbar-nav" id="navbar-toggle">
          <i className={`${styles.Burger} fa-solid fa-bars`}></i>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink exact className={`${styles.NavLink} mr-3`} to="/">
              Home
            </NavLink>
            <NavLink exact className={`${styles.NavLink} mr-3`} to="#">
              Contact
            </NavLink>
            <NavLink exact className={`${styles.NavLink} mr-3`} to="/signin">
              Sign in
            </NavLink>
            <NavLink exact className={`${styles.NavLink} mr-3`} to="/signup">
              Sign up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
