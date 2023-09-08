import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

/**
 *
 */
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState("");
  const [show, setShow] = useState(false);

  const showAlert = (message) => {
    setAlert(message);
    setShow(true);
  };

  const hideAlert = () => {
    setAlert("");
    setShow(false);
  };

  return (
    <AlertContext.Provider value={{ alert, show, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );

  // return (
  //   // <AlertContext.Provider
  //   //   value={{ showAlert, hideAlert }}
  //   // >
  //   <AlertContext.Provider value={{ alert, show, setAlert, setShow }}>
  //     {children}
  //   </AlertContext.Provider>
  //);
};
