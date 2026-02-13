import { createContext } from "react";
import type { Transaction } from "../../types/payment";

export interface PaymentContextType {
  transactions: Transaction[];
  fetchTransactions: (start: string, end: string) => Promise<void>;
}

export const PaymentContext =
  createContext<PaymentContextType | null>(null);
