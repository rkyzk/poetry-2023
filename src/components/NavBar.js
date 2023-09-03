import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/media/poems-logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import { removeTokenTimestamp } from "../utils/utils";
import Avatar from "./Avatar";
import axios from "axios";

/**
 *  Render the first navbar on top right.
 *  Adjust displayed link items depending on the logged in status.
 */
const NavBar = () => {
  /** get the info of logged in user. */
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id;

  /** get the function to set current user info */
  const setCurrentUser = useSetCurrentUser();

  const [myMenu, setMyMenu] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCloseMyMenu = () => {
    setTimeout(() => {
      setMyMenu(false);
      document.removeEventListener("mouseup", handleCloseMyMenu);
    }, 100);
  };

  const handleMyMenu = () => {
    if (myMenu === false) {
      setMyMenu(true);
      document.addEventListener("mouseup", handleCloseMyMenu);
    }
  };

  const handleCloseBurger = (event) => {
    if (event.target.id !== "my-menu" && event.target.id !== "my-menu-icon") {
      setTimeout(() => {
        setExpanded(false);
        document.removeEventListener("mouseup", handleCloseBurger);
      }, 100);
    }
  };

  const handleToggle = () => {
    if (expanded === false) {
      setExpanded(true);
      document.addEventListener("mouseup", handleCloseBurger);
    }
  };

  /**
   * Sign out a user.
   * Close the drop down menu, set currenUser to null,
   * notify the user and remove the token time stamp.
   */
  const handleSignOut = async () => {
    try {
      // request the backend to log out the user
      await axios.post("dj-rest-auth/logout/");
      // set curretUser to null.
      setCurrentUser(null);
      // remove the token time stamp.
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Nav link items will be displayed when logged in.
   * 'setExpanded(false)' will close the dropdown menu.
   */
  const loggedIn = (
    <>
      <Avatar src={currentUser?.profile_image} height={40} navbar />
      <button
        className={`${styles.DropdownBtn} pl-0`}
        id="my-menu"
        onClick={() => handleMyMenu()}
      >
        {currentUser?.username}
        <i
          className="fa fa-angle-down ml-2"
          aria-hidden="true"
          id="my-menu-icon"
        ></i>
      </button>
      {/* if the button is clicked, the dropdown menu will be shown. */}
      {myMenu && (
        <div className={styles.DropdownBox}>
          <div className="mt-1">
            <NavLink
              to={`/profiles/${profile_id}`}
              className={styles.NavDropdownItem}
            >
              My Profile
            </NavLink>
          </div>
          <div>
            <NavLink to="/my-poems" className={styles.NavDropdownItem}>
              My poems
            </NavLink>
          </div>
          <div>
            <NavLink
              className={styles.NavDropdownItem}
              to={`/profiles/${profile_id}/following`}
            >
              Poets I'm following
            </NavLink>
          </div>
          <div>
            <NavLink className={styles.NavDropdownItem} to="/liked">
              Poems I like
            </NavLink>
          </div>
          <div>
            <NavLink
              className={styles.NavDropdownItem}
              to="/"
              onClick={handleSignOut}
            >
              Sign out
            </NavLink>
          </div>
        </div>
      )}
    </>
  );

  /** Nav link items to be displayed when logged out */
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
        Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink exact activeClassName={styles.Active} to="/">
          <Navbar.Brand className={styles.Logo}>
            <img src={logo} alt="logo" />
          </Navbar.Brand>
        </NavLink>
        <h1 className="mt-4">Your Poetry</h1>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          id="navbar-toggle"
          onClick={() => handleToggle()}
        >
          <i className={`${styles.Burger} fa-solid fa-bars`}></i>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`${styles.NavToggle} ml-auto`}>
            <NavLink
              exact
              className={`${styles.NavLink} mr-3`}
              activeClassName={styles.Active}
              to="/"
            >
              Home
            </NavLink>
            <NavLink className={`${styles.NavLink} mr-3`} to="#">
              Contact
            </NavLink>
            {/* If logged in, display 'loggedIn' if not, 'loggedOut'. */}
            {currentUser ? loggedIn : loggedOut}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
