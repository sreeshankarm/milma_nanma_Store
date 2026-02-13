import api from "./axios";

export interface SettingsResponse {
  maxallowedsupplydate: number;
  shiftcodetext: Record<string, string>;
  gateway1referer: string;
}

export const getSettingsApi = async () => {
  const { data } = await api.get<SettingsResponse>("/settings");
  return data;
};
