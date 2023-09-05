import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

/**
 * Return featured profiles data.
 */
export const AlertProvider = ({ children }) => {
  /** stores data about featured profiles. */
  const [alert, setAlert] = useState("");
  const [show, setShow] = useState(false);

  return (
    <AlertContext.Provider
      value={{ alert: [alert, setAlert], show: [show, setShow] }}
    >
      {children}
    </AlertContext.Provider>
  );
};
