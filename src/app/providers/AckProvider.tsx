import { useState } from "react";
import { AckContext } from "../../context/ack/AckContext";
import { ackListApi, saveAckApi } from "../../api/ack.api";
import type { FaultType, InvoiceGroup, SaveAckPayload } from "../../types";

export const AckProvider = ({ children }: { children: React.ReactNode }) => {
  const [ackList, setAckList] = useState<InvoiceGroup[]>([]);
  const [faultTypes, setFaultTypes] = useState<FaultType[]>([]);

  // ✅ GLOBAL DATE STATE
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const setDates = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  /* FETCH LIST */
  const fetchAckList = async (start: string, end: string) => {
    try {
      const data = await ackListApi({
        p_sdate: start,
        p_edate: end,
      });

      const invoices = data?.[0] ?? [];
      const faults = data?.[1] ?? [];

      const grouped: InvoiceGroup[] = invoices.map((inv: any) => {
        let details: any[] = [];

        try {
          details = JSON.parse(inv.invoice_details || "[]");
        } catch {
          details = [];
        }

        return {
          inv_gid: Number(inv.inv_gid),
          inv_no: Number(inv.inv_no),
          inv_date: inv.inv_date,
          vehicle_full: inv.vehicle_full,

          items: details.map((item: any) => ({
            invdet_gid: Number(item.invdet_gid),
            prod_name: item.prod_name,
            qty: Number(item.qty),
            basic_amt: Number(item.basic_amt),
            prod_code: Number(item.prod_code),
            // ✅ ADD THIS
            acknowledgements: item.acknowledgements || [],
          })),
        };
      });

      setAckList(grouped);
      setFaultTypes(faults);
    } catch (err) {
      console.error("ACK LIST ERROR:", err);
      setAckList([]);
    }
  };

  /* SAVE ACK */
  const saveAck = async (payload: SaveAckPayload) => {
    try {
      const res = await saveAckApi(payload);
      return res;
    } catch (err) {
      console.error("SAVE ACK ERROR:", err);
      throw err;
    }
  };

  return (
    <AckContext.Provider
      value={{
        ackList,
        faultTypes,
        fetchAckList,
        saveAck,
        startDate,
        endDate,
        setDates,
      }}
    >
      {children}
    </AckContext.Provider>
  );
};
