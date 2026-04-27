import { createContext } from "react";
import type {
  Transaction,
   LedgerItem
} from "../../types/payment";

export interface PaymentContextType {
  transactions: Transaction[];
  loading: boolean;
  balance: number;
   ledger: LedgerItem[];
  fetchBalance: (start: string, end: string) => Promise<void>;
  fetchTransactions: (start: string, end: string) => Promise<void>;
  fetchLedger: (start: string, end: string) => Promise<void>; 
  clearTransactions: () => void;
}

export const PaymentContext = createContext<PaymentContextType | null>(null);
