import { createContext } from "react";
import type {
  // AckItem,
  FaultType,
  SaveAckPayload,
  InvoiceGroup,
  AckSuccess,
} from "../../types";

export interface AckContextType {
  // ackList: AckItem[];
  ackList: InvoiceGroup[];
  faultTypes: FaultType[];
  fetchAckList: (start: string, end: string) => Promise<void>;
  // saveAck: (payload: SaveAckPayload) => Promise<void>;
  saveAck: (payload: SaveAckPayload) => Promise<AckSuccess>;
    startDate: string;
  endDate: string;
  setDates: (start: string, end: string) => void;
}

export const AckContext = createContext<AckContextType | null>(null);
