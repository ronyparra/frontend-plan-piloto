import axios from "axios";
import { baseURL } from "@/constans/appSettings";
import { getToken } from "@/storage/token.storage";

const instance = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      if (config.defaults) config.defaults.headers.Authorization = `Token ${token}`;
    } else {
      if (config.defaults) delete config.defaults.headers.common.Authorization;
    }
    return config;
  },

  (error) => Promise.reject(error)
);

export default instance;

export const request = async (data) => await instance(data);

