import axios from "axios";

const instance = axios.create({
  baseURL: "https://poetry-drf-2023-7a30acbcd67e.herokuapp.com/",
});
instance.defaults.headers.common["Content-Type"] = "multipart/form-data";

/** create two instances of axios to attach interceptors
    for requests and responses. */
export const axiosReq = axios.create({
  baseURL: "https://poetry-drf-2023-7a30acbcd67e.herokuapp.com/",
});
export const axiosRes = axios.create({
  baseURL: "https://poetry-drf-2023-7a30acbcd67e.herokuapp.com/",
});

export default instance;
