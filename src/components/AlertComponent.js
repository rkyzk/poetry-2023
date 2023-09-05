import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import btnStyles from "../styles/Button.module.css";
import { useAlert, useSetAlert } from "../contexts/AlertContext";
import { useEffect } from "react";

/**
 * Return Alert
 */
const AlertComponent = () => {
  const { alertObj, showObj } = useAlert();
  const [alert, setAlert] = alertObj;
  const [show, setShow] = showObj;

  useEffect(() => {
    const removeAlert = setTimeout(() => {
      setShow(false);
      setAlert("");
    }, 5000);
    return () => {
      clearTimeout(removeAlert);
    };
  }, []);

  if (show) {
    return (
      <Alert variant={"info"} dismissible>
        {alert}
      </Alert>
    );
  } else {
    return null;
  }
};

export default AlertComponent;
