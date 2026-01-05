// import api from "./axios";

// /* ---------- API RESPONSE ---------- */
// export interface ProfileResponse {
//   updatecode: number;
//   user: {
//     id: number;
//     user_name: string;
//     name: string;
//     short_name: string;
//     agent_name: string;
//     login_mobile?: string;
//     email?: string;
//     billingaddress?: string;
//     credit_limit: string;
//     state_name: string;
//   };
// }

// /* ---------- POST: Get My Profile ---------- */
// export const getMyProfile = () =>
//   api.post<ProfileResponse>("/myprofile");









import api from "./axios";
import type { UserProfile } from "../types";

export const getMyProfileApi = () =>
  api.post<UserProfile>("/myprofile");

