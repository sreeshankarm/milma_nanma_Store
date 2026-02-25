import axios from "axios";
import { token } from "../utils/token";

const api = axios.create({
  //   baseURL: "https://nanmastagingapi.milma.in",
  baseURL: "/api",
  // baseURL: import.meta.env.VITE_API_BASE_URL,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use((config) => {
//   const access = token.getAccess();
//   const env = localStorage.getItem("environment");

//   if (access) {
//     config.headers.Authorization = `Bearer ${access}`;
//   }

//   if (env) {
//     config.headers.environment = env;
//   }
//   return config;
// });

/* ---------- REQUEST INTERCEPTOR ---------- */
api.interceptors.request.use((config) => {
  const access = token.getAccess();
  const env = token.getEnvironment();

  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }

  if (env) {
    config.headers.environment = env;
  }

  return config;
});

// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       token.clear();
//       window.location.href = "/signin";
//     }
//     return Promise.reject(err);
//   },
// );

/* ---------- RESPONSE INTERCEPTOR ---------- */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      token.clear();
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  }
);

export default api;









