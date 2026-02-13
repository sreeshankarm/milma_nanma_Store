// // import { createContext, useState, ReactNode } from "react";
// // import { loginService } from "../api/auth.service";
// // import { getUserService } from "../api/user.service";
// // import { token } from "../utils/token";

// // interface AuthContextType {
// //   isAuth: boolean;
// //   login: (mobile: string, password: string) => Promise<void>;
// //   logout: () => void;
// // }

// // export const AuthContext = createContext<AuthContextType | null>(null);

// // export const AuthProvider = ({ children }: { children: ReactNode }) => {
// //   const [isAuth, setIsAuth] = useState<boolean>(!!token.getAccess());

// //   const login = async (mobile: string, password: string) => {
// //     const { data } = await loginService({
// //       login_mobile: mobile,
// //       password,
// //     });

// //     token.set(data);
// //     setIsAuth(true);

// //     const userRes = await getUserService();

// //     if (userRes.data.updatecode === 3) {
// //       alert("Please update the application");
// //       logout();
// //     }
// //   };

// //   const logout = () => {
// //     token.clear();
// //     setIsAuth(false);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ isAuth, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// import { createContext, useState } from "react";
// import type { ReactNode } from "react";
// import { loginService } from "../api/auth.service";
// import { getUserService } from "../api/user.service";
// import { token } from "../utils/token";

// interface AuthContextType {
//   isAuth: boolean;
//   login: (mobile: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// export const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuth, setIsAuth] = useState<boolean>(!!token.getAccess());

//   const login = async (mobile: string, password: string) => {
//     const { data } = await loginService({
//       login_mobile: mobile,
//       password,
//     });

//     token.set(data);
//     setIsAuth(true);

//     const userRes = await getUserService();

//     if (userRes.data.updatecode === 3) {
//     //   alert("Please update the application");
//     //   logout();
//     }
//   };

//   const logout = () => {
//     token.clear();
//     setIsAuth(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import { createContext, useEffect, useState } from "react";
// import type { ReactNode } from "react";
// import { loginService } from "../../api/auth.api";
// import { getUserService } from "../../api/user.api";
// import { token } from "../../utils/token";
// import Loader from "../../components/Loader";
// import { toast ,ToastContainer} from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// interface AuthContextType {
//   isAuth: boolean;
//   userName: string | null;
//   login: (mobile: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// export const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuth, setIsAuth] = useState<boolean>(!!token.getAccess());
//   const [userName, setUserName] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ FETCH USER ON REFRESH
//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!token.getAccess()) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await getUserService();
//         setUserName(res.data.user.user_name);
//         setIsAuth(true);
//       } catch (err: any) {
//         toast.error(
//           err?.response?.data?.message ||
//             "Unable to load user profile. Please try again.",
//           {
//             toastId: "user-fetch-error",
//           }
//         );
//         // logout();
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const login = async (mobile: string, password: string) => {
//     const { data } = await loginService({
//       login_mobile: mobile,
//       password,
//     });

//     token.set(data);
//     setIsAuth(true);

//     const userRes = await getUserService();
//     setUserName(userRes.data.user.user_name);
//   };
  
//   <ToastContainer position="top-right" autoClose={1200} />


//   const logout = () => {
//     token.clear();
//     setIsAuth(false);
//     setUserName(null);
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <AuthContext.Provider value={{ isAuth, userName, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };





import { createContext } from "react";

export interface AuthContextType {
  isAuth: boolean;
  userName: string | null;
  login: (mobile: string, password: string) => Promise<void>;
  // logout: () => void;
    logout: () => Promise<void>; // 👈 async now

}

export const AuthContext =
  createContext<AuthContextType | null>(null);
