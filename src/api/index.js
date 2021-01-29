import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const api = axios.create();

// base url
if (process.env.NODE_ENV === "production") {
  api.defaults.baseURL = "";
} else {
  api.defaults.baseURL = "http://localhost:5000/";
}

if (process.env.NODE_ENV === "production") {
  api.defaults.baseURL = "https://lunchable-api.herokuapp.com/";
} else {
  api.defaults.baseURL = "http://localhost:5000/";
}

api.interceptors.request.use(async (config) => {
  config.headers = { "access-token": cookies.get("ypostUser").accessToken };
  return config;
});

export default api;
