import { useState } from "react";
import { InvoiceContext } from "../../context/invoice/InvoiceContext";
import { billsApi, invoiceDetailsApi } from "../../api/invoice.api";
import type { BillItem, InvoiceDetail } from "../../types";

export const InvoiceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bills, setBills] = useState<BillItem[]>([]);
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetail[]>([]);

  const fetchBills = async (start: string, end: string) => {
    const { data } = await billsApi({
      p_sdate: start,
      p_edate: end,
    });
    setBills(data ?? []);
  };

  const fetchInvoiceDetails = async (gid: number) => {
    const { data } = await invoiceDetailsApi(gid);
    setInvoiceDetails(data.invoicedetails ?? []);
  };

  return (
    <InvoiceContext.Provider
      value={{
        bills,
        invoiceDetails,
        fetchBills,
        fetchInvoiceDetails,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
