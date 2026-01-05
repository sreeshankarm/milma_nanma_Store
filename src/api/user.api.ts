// import api from "./axios";

// export interface UserResponse {
//   updatecode: number;
//   user: {
//     id: number;
//     user_name: string;
//   };
// }

// export const getUserService = () => api.get<UserResponse>("/user");



import api from "./axios";
import type { UserResponse } from "../types";

export const getUserApi = () =>
  api.get<UserResponse>("/user");

