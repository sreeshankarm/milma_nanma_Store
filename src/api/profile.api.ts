import api from "./axios";
import type { UserProfile } from "../types";

export const getMyProfileApi = () => api.post<UserProfile>("/myprofile");

export const saveAgentLocationApi = (payload: {
  latitude: number;
  longitude: number;
}) =>
  api.post<{
    success: number;
    message: string;
  }>("/saveagentoutletlocation", payload);
