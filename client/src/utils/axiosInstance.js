import axios from "axios";
import { backendUrl } from "./config.js";

export const axiosInstance = axios.create({
  baseURL: backendUrl,
});

axiosInstance.interceptors.request.use((req) => {
  const accessToken = JSON.parse(localStorage.getItem("user"))?.user?.accessToken;
  req.headers.Authorization = "Bearer " + accessToken;
  return req;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const prevRequest = err?.config;

    if (err.response.status === 401 || err.response.status === 500) {
      const refreshToken = JSON.parse(localStorage.getItem("user"))?.user?.refreshToken;

      return await axios
        .get(`${backendUrl}/auth/refresh`, {
          headers: {
            Authorization: "Bearer " + refreshToken,
          },
        })
        .then((data) => {
          console.log("data", data);
          localStorage.setItem(
            "user",
            JSON.stringify({ user: data.data, authenticated: true })
          );
          return data;
        })
        .then((data) =>
          axiosInstance({
            ...prevRequest,
            headers: {
              ...prevRequest.headers,
              Authorization: "Bearer " + data.data.accessToken,
            },
          })
        )
        .catch((refreshTokenAPIError) => {
          console.log(refreshTokenAPIError);
          localStorage.removeItem("user");
          window.location.replace("/login");
          return Promise.reject(refreshTokenAPIError);
        });
    }
    return Promise.reject(err.response);
  }
);