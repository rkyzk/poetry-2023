import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styles from "../styles/ConfirmationModal.module.css";
import btnStyles from "../styles/Button.module.css";
import { useModal } from "../contexts/ModalContext";
import { useAlert } from "../contexts/AlertContext";
import axios from "axios";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import { removeTokenTimestamp } from "../utils/utils";

/**
 * Return Confirmation modal.
 */
const ModalComponent = () => {
  const { obj, objId, showModal, hideModal } = useModal();
  /** get info of logged in user. */
  const currentUser = useCurrentUser();
  /** get the function to set current user info */
  const setCurrentUser = useSetCurrentUser();

  /** store info on which pages the user has visited. */
  const history = useHistory();
  const { showAlert } = useAlert();

  /** Create Modal text */
  let modalText = `Are you sure you want to delete your ${obj}?
                   You won't be able to retrieve the data.`;

  /** delete a poem from the backend,
      hide confirmation modal and send the user to 'My Poems' page. */
  const handleDeletePoem = async () => {
    try {
      await axiosReq.delete(`/poems/${objId}`);
      hideModal();
      history.push("/my-poems");
      showAlert("Your poem has been deleted.");
    } catch (err) {
      showAlert("Something went wrong.  Please try again.");
    }
  };

  /** delete profile and deactivate the user */
  const handleDeleteAccount = async () => {
    try {
      // await axiosReq.delete(`/profiles/${objId}`);
      await axiosRes.put("/dj-rest-auth/user/", { is_active: false });
      // request the backend to log out the user
      await axios.post("dj-rest-auth/logout/");
      // set curretUser to null.
      setCurrentUser(null);
      // remove the token time stamp.
      removeTokenTimestamp();
      history.push("/");
      showAlert("Your profile and account have been deleted.");
    } catch (err) {
      showAlert("Something went wrong.  Please try again.");
    } finally {
      /** hide modal, display home page and message */
      hideModal();
    }
  };

  return (
    <>
      {/* The modal will appear if showModal is true */}
      {showModal && (
        <Modal show={showModal}>
          <Modal.Body closeButton>
            <span className={styles.Text}>{modalText}</span>
          </Modal.Body>
          <Modal.Footer>
            {obj === "poem" ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Olive}`}
                onClick={handleDeletePoem}
              >
                delete
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Olive}`}
                onClick={handleDeleteAccount}
              >
                delete
              </Button>
            )}
            {/* hideConfirmationModal will set 'show' false. */}
            <Button
              onClick={() => hideModal(false)}
              className={`${btnStyles.Button} ${btnStyles.Olive}`}
            >
              cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ModalComponent;
