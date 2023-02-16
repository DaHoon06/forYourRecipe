import axios, { AxiosStatic } from "axios";
import store from "@/store/index";
import router from "@/router/index";

const baseURL = "/api";
const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

instance.interceptors.request.use((config) => {
  if (store) {
    const { token } = store.getters;
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    const { data, status } = response;
    const { message } = data;

    if (status === 401) {
      return router.replace({ path: "/" }).catch(() => ({}));
    }

    return response;
  }
);

export const ins = instance as AxiosStatic;
