import axios, {type  AxiosRequestConfig, type AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

api.interceptors.request.use(
  (config) => {
    const Token = "token";
    localStorage.setItem("auth", Token);

    // config.headers = {
    //   ...config.headers,
    //   Authorization: `Bearer ${Token}`,
    // };

    console.log("Request Interceptor: Token added to headers");
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    const token = localStorage.getItem("auth");
    console.log(token);
    return response;
  },
  (error) => {
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

export default api;
