import Alert from "react-bootstrap/Alert";
import { useAlert } from "../contexts/AlertContext";
import { useEffect } from "react";
import styles from "../styles/AlertComponent.module.css";

/**
 * Return Alert
 */
const AlertComponent = () => {
  const { alert, show, hideAlert } = useAlert();
  useEffect(() => {
    const removeAlert = setTimeout(() => {
      hideAlert();
    }, 5000);
    return () => {
      clearTimeout(removeAlert);
    };
  }, [show]);
  if (show) {
    return (
      <Alert className={styles.AlertMessage} variant={"info"}>
        {alert}
      </Alert>
    );
  } else {
    return null;
  }
};

export default AlertComponent;
