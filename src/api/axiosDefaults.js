import axios from "axios";

axios.defaults.baseURL = "https://yourpoetry-2c71a864553e.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
