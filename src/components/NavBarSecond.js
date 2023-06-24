import React from "react"; // removed { useContext }
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import styles from "../styles/NavBarSecond.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
// import { SetCurrentUserContext } from "../App";

const NavBarSecond = () => {
  // const currentUser = useContext(SetCurrentUserContext);
  const currentUser = useCurrentUser();

  return (
    <Navbar className={styles.NavBarSecond} expand="md" fixed="top">
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
        <NavLink className={styles.NavLink} to="/poems/create">
          Write Poems
        </NavLink>
      </Container>
    </Navbar>
  );
};

export default NavBarSecond;