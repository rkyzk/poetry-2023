import React from "react"; // removed { useContext }
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";


const NavBar = () => {
  const currentUser = useCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const setCurrentUser = useSetCurrentUser();
  
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };

  const loggedIn = (
    <>
      <Avatar src={currentUser?.profile_image} height={40} />
      <NavDropdown title={currentUser?.username} id="nav-dropdown">
        <NavDropdown.Item>
          <NavLink className={styles.NavLink} to={`/profiles/${currentUser?.profile_id}`}>
            My Profile
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <NavLink className={styles.NavLink} to="/my-poems">
            My poems
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <NavLink className={styles.NavLink} to={`/profiles/${currentUser?.profile_id}/following`}>
            Poets I'm following
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <NavLink className={styles.NavLink} to="/liked">
            Poems I liked
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <NavLink
            className={styles.NavLink}
            to="/"
            onClick={handleSignOut}
          >
            Sign out
          </NavLink> 
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );

  const loggedOut = (
    <>
      <NavLink
        className={`${styles.NavLink} mr-3`}
        activeClassName={styles.Active}
        to="/signin"
      >
        Sign in
      </NavLink>
      <NavLink
        className={`${styles.NavLink} mr-3`}
        activeClassName={styles.Active}
        to="/signup"
      >
        Register
      </NavLink>
    </>
  );

  return (
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink exact activeClassName={styles.Active} to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="70" />
          </Navbar.Brand>
        </NavLink>
        <h1 className="mt-4">Your Poetry</h1>
        <Navbar.Toggle
          ref={ref}
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={`${styles.NavLink} mr-3`}
              activeClassName={styles.Active}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={`${styles.NavLink} mr-3`}
              activeClassName={styles.Active}
              to="/contact"
            >
              Contact
            </NavLink>
            {currentUser? loggedIn : loggedOut}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;