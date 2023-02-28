import axios, { AxiosStatic } from "axios";
import store from "@/store/index";
import router from "@/router/index";

const baseURL =
  process.env.VUE_APP_PRODUCT === "development"
    ? "/api"
    : "https://api.no1recipe.com/api";
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

    console.log(message, response);

    if (status !== 200) {
      return router.replace({ path: "/404" }).catch(() => ({}));
    }

    return response;
  }
);

export const ins = instance as AxiosStatic;
