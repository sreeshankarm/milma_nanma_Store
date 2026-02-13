import { useState } from "react";
import { AckContext } from "../../context/ack/AckContext";
import { ackListApi, saveAckApi } from "../../api/ack.api";
import type { AckItem, FaultType, SaveAckPayload } from "../../types";

export const AckProvider = ({ children }: { children: React.ReactNode }) => {
  const [ackList, setAckList] = useState<AckItem[]>([]);
  const [faultTypes, setFaultTypes] = useState<FaultType[]>([]);

  const fetchAckList = async (start: string, end: string) => {
    const { data } = await ackListApi({
      p_sdate: start,
      p_edate: end,
    });
    setAckList(data[0] ?? []);
    setFaultTypes(data[1] ?? []);
  };

  const saveAck = async (payload: SaveAckPayload) => {
    await saveAckApi(payload);
  };

  return (
    <AckContext.Provider value={{ ackList, faultTypes, fetchAckList, saveAck }}>
      {children}
    </AckContext.Provider>
  );
};
