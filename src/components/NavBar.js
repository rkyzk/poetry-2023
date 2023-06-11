import React from "react"; // removed { useContext }
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.jpg";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
// import { SetCurrentUserContext } from "../App";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  // const setCurrentUser = useSetCurrentUser();
  
  // const handleSignOut = async () => {
  //   try {
  //     await axios.post("dj-rest-auth/logout/");
  //     setCurrentUser(null);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const loggedIn = (
    <>
      <NavLink
        className={styles.NavLink}
        to="/"
        // onClick={handleSignOut}
      >
        Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );

  const loggedOut = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        className="mr-3"
        to="/signin"
      >
        Sign in
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        className="mr-3"
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
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          ref={ref}
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
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
            <NavLink
              className={styles.NavLink}
              className="mr-3"
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