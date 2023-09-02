import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

/**
 * Return CurrentUserContext and SetCurrentUserContext.
 * Hold functions to refresh access token if refresh token
 * is valid.
 */
export const CurrentUserProvider = ({ children }) => {
  /** stores info about the logged in user. */
  const [currentUser, setCurrentUser] = useState(null);
  /** stores info on which pages the user has visited. */
  const history = useHistory();

  /**
   * Get info about the logged in user from the backend
   * and set the data to currentUser.
   */
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {}
  };
  useEffect(() => {
    handleMount();
  }, []);

  /**
   * Before children mount, run interceptors,
   * so users stay logged in as long as
   * the refresh token is valid.
   */
  useMemo(() => {
    /**
     * if refresh token is valid, run interceptor,
     * send a request to refresh the acces token before
     * request by users is processed.
     */
    axiosReq.interceptors.request.use(
      async (config) => {
        // If refresh token hasn't expired, refresh the access token.
        if (shouldRefreshToken()) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              // If the user was logeed in, send them to sign in page.
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (err) => {
        // In case of an error, reject the promise with the error.
        return Promise.reject(err);
      }
    );

    /**
     * Intercept responses and if there's an 'unauthorized' error
     * send a request to refresh the access token.
     * If that fails, set currentUser to null and remove
     * the Token Times Stamp.
     * This prevents users from getting
     * logged out every 5 minutes when the access token expires.
     */
    axiosRes.interceptors.response.use(
      // If there's no error, return the response.
      (response) => response,
      // In case of an error check if the error is 'unauthorized.'
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            // if refreshing the token fails, set currenUser to null.
            setCurrentUser((prevCurrentUser) => {
              /** if the user was logged in,
                  redirect to sign in page.
                */
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            // remove token time stamp.
            removeTokenTimestamp();
          }
          /** If there was no error while refreshing the token,
              let the axios instance with error config exit from
              the interceptor. */
          return axios(err.config);
        }
        /** if the error was not 401, reject the promise with the error
            to exit the interceptor. */
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
