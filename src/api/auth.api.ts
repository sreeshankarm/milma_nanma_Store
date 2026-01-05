// import api from "./axios";

// export interface LoginPayload {
//   login_mobile: string;
//   password: string;
// }

// export const loginService = (payload: LoginPayload) =>
//   api.post("/login", payload);




import api from "./axios";
import type { LoginPayload, LoginResponse } from "../types";

export const loginApi = (payload: LoginPayload) =>
  api.post<LoginResponse>("/login", payload);
