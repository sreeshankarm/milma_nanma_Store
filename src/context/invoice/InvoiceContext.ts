import { createContext } from "react";
import type { BillItem, InvoiceDetail } from "../../types";

export interface InvoiceContextType {
  bills: BillItem[];
  invoiceDetails: InvoiceDetail[];
  fetchBills: (start: string, end: string) => Promise<void>;
  fetchInvoiceDetails: (gid: number) => Promise<void>;
}

export const InvoiceContext =
  createContext<InvoiceContextType | null>(null);
