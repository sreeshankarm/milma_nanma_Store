import { createContext } from "react";
import type {
  AckItem,
  FaultType,
  SaveAckPayload,
} from "../../types";

export interface AckContextType {
  ackList: AckItem[];
  faultTypes: FaultType[];
  fetchAckList: (start: string, end: string) => Promise<void>;
  saveAck: (payload: SaveAckPayload) => Promise<void>;
}

export const AckContext =
  createContext<AckContextType | null>(null);
