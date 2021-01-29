import axios from "axios";
import Cookies from "universal-cookie";
import { Base } from "../util/base";

const cookies = new Cookies();
const api = axios.create();

// base url
api.defaults.baseURL = Base;

api.interceptors.request.use(async (config) => {
  config.headers = { "access-token": cookies.get("ypostUser").accessToken };
  return config;
});

export default api;
