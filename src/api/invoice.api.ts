import api from "./axios";
import type {
  DateRange,
  BillItem,
  // InvoiceDetail,
  OrderInvoiceStatusResponse,
  InvoiceDetailsResponse 
} from "../types";

/* ---------- BILLS ---------- */

export const billsApi = (payload: DateRange) =>
  api.post<BillItem[]>("/bills", payload);

/* ---------- INVOICE DETAILS ---------- */

export const invoiceDetailsApi = (inv_gid: number) =>
  api.post<InvoiceDetailsResponse>("/invoicedetails", { inv_gid });

/* ---------- ORDER INVOICE STATUS ---------- */

export const orderInvoiceStatusApi = (order_gid: number) => {
  const form = new FormData();
  form.append("order_gid", String(order_gid));

  return api.post<OrderInvoiceStatusResponse>(
    "/getinvoicedstatusoforderid",
    form,
  );
};


/* ---------- PRINT INVOICE ---------- */

export const printInvoiceApi = (inv_gid: string, inv_date: string) => {
  const form = new FormData();
  form.append("inv_gid", inv_gid);
  form.append("inv_date", inv_date);

  return api.post("/printinvoice", form, {
    responseType: "blob", // ✅ IMPORTANT for PDF
  });
};

/* ---------- PRINT CASH RECEIPT ---------- */

export const printCashReceiptApi = (
  drcr_gid: string,
  drcr_date: string
) => {
  const form = new FormData();
  form.append("drcr_gid", drcr_gid);
  form.append("drcr_date", drcr_date);

  return api.post("/printcashreceipt", form, {
    responseType: "blob", // ✅ IMPORTANT for PDF
  });
};
