import { createContext, useContext, useState } from "react";

const AlertContext = createContext();
const SetAlertContext = createContext();

export const useAlert = () => useContext(AlertContext);
export const useSetAlert = () => useContext(SetAlertContext);

/**
 * Return featured profiles data.
 */
export const AlertProvider = ({ children }) => {
  /** stores data about featured profiles. */
  const [alert, setAlert] = useState("");
  const [show, setShow] = useState(false);

  return (
    <AlertContext.Provider value={{ alert, show, setShow }}>
      <SetAlertContext.Provider value={setAlert}>
        {children}
      </SetAlertContext.Provider>
    </AlertContext.Provider>
  );
};
