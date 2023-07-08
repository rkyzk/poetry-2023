import axios from "axios";

axios.defaults.baseURL = "https://poetry-6c31c94e3988.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
