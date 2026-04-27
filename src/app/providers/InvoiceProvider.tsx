import { useState } from "react";
import { InvoiceContext } from "../../context/invoice/InvoiceContext";
import {
  billsApi,
  invoiceDetailsApi,
  orderInvoiceStatusApi,
  printInvoiceApi,
  printCashReceiptApi,
} from "../../api/invoice.api";
import type {
  InvoiceDetail,
  OrderInvoiceStatus,
  LastAvailableLocation,
  BillItem,
} from "../../types";
import { toast } from "react-toastify";

export const InvoiceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bills, setBills] = useState<BillItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetail[]>([]);
  const [orderInvoices, setOrderInvoices] = useState<OrderInvoiceStatus[]>([]);
  const [invoiceStatus, setInvoiceStatus] = useState<"success" | "error" | "">(
    "",
  );
  const [lastLocation, setLastLocation] =
    useState<LastAvailableLocation | null>(null);



  const fetchBills = async (start: string, end: string) => {
    try {
      setLoading(true);
      // ✅ CLEAR BEFORE API CALL
      setBills([]);

      const { data } = await billsApi({
        p_sdate: start,
        p_edate: end,
      });

      setBills(data ?? []);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch bills");
      // setBills([]); // ensure state is cleared on error
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoiceDetails = async (inv_gid: number) => {
    const { data } = await invoiceDetailsApi(inv_gid);
    setInvoiceDetails(data.invoicedetails ?? []);
    setLastLocation(data.lastavailablelocation ?? null);
  };

  const fetchOrderInvoiceStatus = async (order_gid: number) => {
    const { data } = await orderInvoiceStatusApi(order_gid);

    // ✅ SAFE TYPE CHECK
    if (data.status === "success" || data.status === "error") {
      setInvoiceStatus(data.status);
    } else {
      setInvoiceStatus(""); // fallback safety
    }

    if (data.status === "success") {
      setOrderInvoices(data.data ?? []);
    } else {
      setOrderInvoices([]);
    }
  };

  /* ---------- PRINT INVOICE ---------- */
  const printInvoice = async (inv_gid: string, inv_date: string) => {
    try {
      const res = await printInvoiceApi(inv_gid, inv_date);

      const file = new Blob([res.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);

      window.open(fileURL); // ✅ open in new tab
    } catch (error) {
      // console.error("Print Invoice Error", error);
       throw error;
    }
  };

  /* ---------- PRINT CASH RECEIPT ---------- */
  const printCashReceipt = async (drcr_gid: string, drcr_date: string) => {
    try {
      const res = await printCashReceiptApi(drcr_gid, drcr_date);

      const file = new Blob([res.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);

      window.open(fileURL); // ✅ open PDF
    } catch (error: any) {
      // console.error("Print Cash Receipt Error", error);
      throw error;
    }
  };

  const clearTransactions = () => {
    setBills([]);
  };

  return (
    <InvoiceContext.Provider
      value={{
        bills,
        loading,
        invoiceDetails,
        fetchBills,
        fetchInvoiceDetails,
        orderInvoices,
        fetchOrderInvoiceStatus,
        invoiceStatus,
        lastLocation,
        printInvoice,
        printCashReceipt,
        clearTransactions,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
