import axios from "axios";

/** set the base URL for axios requests */
axios.defaults.baseURL = "https://poetry-drf-2023-7a30acbcd67e.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
// To avoid any CORS errors when sending cookies
axios.defaults.withCredentials = true;

/** create two instances of axios to attach interceptors
    for requests and responses. */
export const axiosReq = axios.create();
export const axiosRes = axios.create();
