import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { axiosReq } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styles from "../styles/ConfirmationModal.module.css";
import btnStyles from "../styles/Button.module.css";
import { useAlert } from "../contexts/AlertContext";

/**
 * Return Confirmation modal.
 * The modal will be displayed when 'show' is set to true.
 */
const ConfirmationModal = ({ show, setShowModal, id }) => {
  /** store info on which pages the user has visited. */
  const history = useHistory();
  const { showAlert } = useAlert();

  /** delete a poem from the backend,
      hide confirmation modal and send the user to 'My Poems' page. */
  const handleDeletePoem = async () => {
    try {
      await axiosReq.delete(`/poems/${id}`);
      setShowModal(false);
      history.push("/my-poems");
      showAlert("Your poem has been deleted.");
    } catch (err) {
      showAlert("Something went wrong.  Please try again.");
    }
  };

  return (
    <>
      {/* The modal will appear if show is true */}
      <Modal show={show}>
        <Modal.Body closeButton>
          <span className={styles.Text}>
            Are you sure you want to delete your poem? You won't be able to
            retrieve it.
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={`${btnStyles.Button} ${btnStyles.Olive}`}
            onClick={handleDeletePoem}
          >
            delete
          </Button>
          {/* hideConfirmationModal will set 'show' false. */}
          <Button
            onClick={() => setShowModal(false)}
            className={`${btnStyles.Button} ${btnStyles.Olive}`}
          >
            cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
