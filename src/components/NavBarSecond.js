import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import styles from "../styles/NavBarSecond.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

/**
 * Return the second navigation bar (one on the left side of the page).
 * The component will be displayed on all pages except for
 * signup and signin pages.
 * Render different nav link items depending on the logged in status.
 */
const NavBarSecond = () => {
  /** stores info on the logged in user. */
  const currentUser = useCurrentUser();
  /** get the URL of the current page. */
  const { pathname } = useLocation();

  /** On signin and singup pages set hide true so this component won't appear. */
  let hide = pathname === "/signin" || pathname === "/signup";

  const [poemsMenu, setPoemsMenu] = useState(false);

  return (
    !hide && (
      <Navbar className={styles.NavBarSecond} expand="md" fixed="top">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-second-nav">
            <i className="fa-solid fa-bars"></i>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-second-nav">
            <Nav className={`${styles.NavToggle} text-left`}>
              <button
                className={`${styles.NavLink} ${styles.PoemsDropdown}`}
                id="poems-dropdown"
              >
                Poems
                <i className="fa fa-angle-down ml-2" aria-hidden="true"></i>
              </button>
              {poemsMenu && (
                <div className={`${styles.PoemsMenu} py-2`}>
                  <div>
                    <NavLink
                      className={styles.NavDropdownItem}
                      to="#"
                      id="new-poems"
                    >
                      New Poems
                    </NavLink>
                  </div>
                  <div>
                    <NavLink
                      className={styles.NavDropdownItem}
                      to="#"
                      id="popular-poems"
                    >
                      Popular Poems
                    </NavLink>
                  </div>
                  <div>
                    <NavLink
                      className={styles.NavDropdownItem}
                      to="#"
                      id="poems-by-cat"
                    >
                      Poems by Categories
                    </NavLink>
                  </div>
                  <div>
                    <NavLink
                      className={styles.NavDropdownItem}
                      to="#"
                      id="search-poems"
                    >
                      Search Poems
                    </NavLink>
                  </div>
                </div>
              )}
              {/* if user is logged in, display the link 'Write Poems' */}
              {currentUser && (
                <NavLink
                  className={`${styles.NavLink} ${styles.NavItems} mt-2`}
                  to="#"
                >
                  Write Poems
                </NavLink>
              )}
              <NavLink
                className={`${styles.NavLink} ${styles.NavItems} mt-2`}
                to="#"
              >
                Search Profiles
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  );
};

export default NavBarSecond;
