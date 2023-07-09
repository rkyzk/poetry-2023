import React from "react"; // removed { useContext }
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import styles from "../styles/NavBarSecond.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const NavBarSecond = () => {
  const currentUser = useCurrentUser();

  return (
    <Navbar className={styles.NavBarSecond} expand="md" fixed="top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <NavDropdown className={`ml-4 ${styles.NavLink}`} title="Poems" id="nav-dropdown">
              <NavDropdown.Item className={styles.NavLink} to="/new-poems">
                  New Poems
              </NavDropdown.Item>
              <NavDropdown.Item className={styles.NavLink} to="/popular-poems">
                  Popular Poems
              </NavDropdown.Item>
              <NavDropdown.Item className={styles.NavLink}>
                  Poems by Categories
              </NavDropdown.Item>
              <NavDropdown.Item className={styles.NavLink} to="/search">
                Search
              </NavDropdown.Item>
            </NavDropdown>
            <NavLink className={`${styles.NavLink}`} to="/poems/create">
              Write Poems
            </NavLink>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarSecond;