import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import reportWebVitals from "./reportWebVitals";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { FeaturedProfilesDataProvider } from "./contexts/FeaturedProfilesDataContext";
import { AlertProvider } from "./contexts/AlertContext";
import { ModalProvider } from "./contexts/ModalContext";

ReactDOM.render(
  <Router>
    <AlertProvider>
      <CurrentUserProvider>
        <ModalProvider>
          <FeaturedProfilesDataProvider>
            <App />
          </FeaturedProfilesDataProvider>
        </ModalProvider>
      </CurrentUserProvider>
    </AlertProvider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
