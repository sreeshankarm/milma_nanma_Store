import { createContext } from "react";
import type {
  InvoiceDetail,
  OrderInvoiceStatus,
  LastAvailableLocation,
  BillItem,
} from "../../types";

export interface InvoiceContextType {
  bills: BillItem[];
   loading: boolean;
  invoiceDetails: InvoiceDetail[];
  orderInvoices: OrderInvoiceStatus[];
  fetchOrderInvoiceStatus: (order_gid: number) => Promise<void>;
  fetchBills: (start: string, end: string) => Promise<void>;
  fetchInvoiceDetails: (inv_gid: number) => Promise<void>;
  invoiceStatus: "success" | "error" | "";
  lastLocation: LastAvailableLocation | null;
  printInvoice: (inv_gid: string, inv_date: string) => Promise<void>;
  printCashReceipt: (drcr_gid: string, drcr_date: string) => Promise<void>;
  clearTransactions: () => void;
}

export const InvoiceContext = createContext<InvoiceContextType | null>(null);
