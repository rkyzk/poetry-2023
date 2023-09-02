import axios from "axios";

const instance = axios.create({
  baseURL: "https://poetry-drf-2023-7a30acbcd67e.herokuapp.com/",
});
instance.defaults.headers.common["Content-Type"] = "multipart/form-data";

export default instance;
