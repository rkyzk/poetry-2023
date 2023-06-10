import React from "react"; // removed { useContext }
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
// import { SetCurrentUserContext } from "../App";

const NavBarSecond = () => {
  // const currentUser = useContext(SetCurrentUserContext);
  const currentUser = useCurrentUser();

  return (
    <Navbar className={styles.NavBar} expand="md">
      <Container>
        <NavDropdown title="Poems" id="nav-dropdown">
          <NavDropdown.Item>
            <NavLink className={styles.NavLink} to="/new-poems">
              New Poems
            </NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item>Popular Poems</NavDropdown.Item>
          <NavDropdown.Item>Poems by Categories</NavDropdown.Item>
          <NavDropdown.Item>Search</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
};

export default NavBarSecond;