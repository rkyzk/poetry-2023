import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";
import { useModal } from "../contexts/ModalContext";

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
export const MoreDropdown = ({ handleEdit, poemId, handleDeleteComment }) => {
  const { showConfModal } = useModal();

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
        {poemId ? (
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={() => showConfModal(poemId)}
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
 * delete user account.
 * Action can be performed only if user owns the account
 */
const DeleteAccount = async (id) => {
  const { data } = await axios.put(`/profiles/delete/${id}`);
  // import alert context and setAlert
  // const { showAlert } = useAlert();
  // showAlert(data.detail);
  console.log(data.status);
  console.log(data.detail);
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
