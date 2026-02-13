import api from "./axios";
import type {
  AckListPayload,
  SaveAckPayload,
  AckItem,
  FaultType,
  ApiSuccess,
} from "../types";

export type AckListResponse = [AckItem[], FaultType[]];

export const ackListApi = (payload: AckListPayload) =>
  api.post<AckListResponse>("/acknowledgement", payload);

export const saveAckApi = (payload: SaveAckPayload) =>
  api.post<ApiSuccess>("/saveack", payload);
