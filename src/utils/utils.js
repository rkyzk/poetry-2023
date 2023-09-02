import jwtDecode from "jwt-decode";

/**
 * Set refresh token time stamp in the local storage.
 * @param data
 */
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

/**
 * Return true if the refresh token hasn't expired.
 * @returns true/false
 */
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

/**
 * Remove refresh token time stamp.
 */
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
