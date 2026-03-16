// import axios from "axios";
// import { token } from "../utils/token";

// const api = axios.create({
//   //   baseURL: "https://nanmastagingapi.milma.in",
//   baseURL: "/api",
//   // baseURL: import.meta.env.VITE_API_BASE_URL,
// withCredentials: true,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

// // api.interceptors.request.use((config) => {
// //   const access = token.getAccess();
// //   const env = localStorage.getItem("environment");

// //   if (access) {
// //     config.headers.Authorization = `Bearer ${access}`;
// //   }

// //   if (env) {
// //     config.headers.environment = env;
// //   }
// //   return config;
// // });

// /* ---------- REQUEST INTERCEPTOR ---------- */
// api.interceptors.request.use((config) => {
//   const access = token.getAccess();
//   const env = token.getEnvironment();

//   if (access) {
//     config.headers.Authorization = `Bearer ${access}`;
//   }

//   if (env) {
//     config.headers.environment = env;
//   }

//   return config;
// });

// // api.interceptors.response.use(
// //   (res) => res,
// //   (err) => {
// //     if (err.response?.status === 401) {
// //       token.clear();
// //       window.location.href = "/signin";
// //     }
// //     return Promise.reject(err);
// //   },
// // );

// /* ---------- RESPONSE INTERCEPTOR ---------- */
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       token.clear();
//       window.location.href = "/signin";
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;








// import axios from "axios";
// import type { AxiosError, InternalAxiosRequestConfig } from "axios";
// import { token } from "../utils/token";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

// /**
//  * REQUEST INTERCEPTOR
//  */
// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const accessToken = token.getAccess();
//     const environment = token.getEnvironment();

//     if (accessToken && config.headers) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     if (environment && config.headers) {
//       config.headers.environment = environment;
//     }

//     return config;
//   },
//   (error: AxiosError) => Promise.reject(error),
// );

// /**
//  * RESPONSE INTERCEPTOR
//  */
// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const status = error.response?.status;

//     if (status === 401) {
//       // Optional: avoid infinite loop
//       if (window.location.pathname !== "/signin") {
//         token.clear();
//         window.location.replace("/signin");
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// export default api;













import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { token } from "../utils/token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/* REQUEST INTERCEPTOR */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = token.getAccess();
    const environment = token.getEnvironment();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (environment) {
      config.headers.environment = environment;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/* RESPONSE INTERCEPTOR */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (window.location.pathname !== "/signin") {
        token.clear();
        window.location.replace("/signin");
      }
    }

    return Promise.reject(error);
  }
);

export default api;