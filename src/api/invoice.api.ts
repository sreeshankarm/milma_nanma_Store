import api from "./axios";
import type { DateRange, BillItem, InvoiceDetail } from "../types";

export const billsApi = (payload: DateRange) =>
  api.post<BillItem[]>("/bills", payload);

interface InvoiceDetailsResponse {
  invoicedetails: InvoiceDetail[];
}

export const invoiceDetailsApi = (inv_gid: number) =>
  api.post<InvoiceDetailsResponse>("/invoicedetails", { inv_gid });
