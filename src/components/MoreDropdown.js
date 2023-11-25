import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";
import { useHistory } from "react-router";

/**
 * Set the three dots to forwardRef.
 * The forwardRef is necessary since the dropdown needs
 * access to the DOM node in order to position the Menu.
 */
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-ellipsis-v"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

/**
 * Return a dropdown menu for editing/deleting poems and comments
 * shown as three dots.
 */
export const MoreDropdown = ({
  handleEdit,
  setShowModal,
  handleDeleteComment,
}) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <i className="fas fa-edit" />
        </Dropdown.Item>
        {/* If a poem will be deleted, setShowModal is passed down,
            so a confirmation modal will be displayed.
            If a comment will be deleted, handleDeleteComment will be fired
            without a confirmation. */}
        {setShowModal ? (
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={() => setShowModal(true)}
            aria-label="delete"
          >
            <i className="fas fa-trash-alt" />
          </Dropdown.Item>
        ) : (
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={handleDeleteComment}
            aria-label="delete"
          >
            <i className="fas fa-trash-alt" />
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

/**
 * Return a dropdown menu for editing profiles
 * shown as three dots.
 */
export function ProfileEditDropdown({ id }) {
  /** stores info on which pages the user has been to. */
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className="fas fa-edit" /> edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className={`far fa-id-card ${styles.Icons}`} />
          change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className={`fas fa-key ${styles.Icons}`} />
          change password
        </Dropdown.Item>
        <Dropdown.Item
          // onClick={() => }
          aria-label="delete-account"
        >
          <i className={`fa-solid fa-delete-left ${styles.Icons}`} />
          delete my account
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
