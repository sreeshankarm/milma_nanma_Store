import api from "./axios";
import type {
  AckListPayload,
  SaveAckPayload,
  AckItem,
  FaultType,
  AckSuccess,
} from "../types";

export type AckListResponse = [AckItem[], FaultType[]];

export const ackListApi = async (payload: AckListPayload) => {
  const { data } = await api.post<AckListResponse>("/acknowledgement", payload);
  return data;
};

export const saveAckApi = async (payload: SaveAckPayload) => {
  const { data } = await api.post<AckSuccess>("/saveack", payload);
  return data;
};
