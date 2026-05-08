import { useState } from "react";
import { PaymentContext } from "../../context/Payment/PaymentContext";
import {
  transactionHistoryApi,
  getLedgerBalanceApi,
} from "../../api/payment.api";
import type { Transaction, LedgerItem } from "../../types/payment";

export const PaymentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [ledger, setLedger] = useState<LedgerItem[]>([]);

  const fetchTransactions = async (start: string, end: string) => {
    try {
      setLoading(true);

      const { data } = await transactionHistoryApi({
        startdate: start,
        enddate: end,
      });

      setTransactions(data.transactions ?? []);
    } catch (error) {
      console.error("Transaction fetch failed", error);
      // setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- FETCH LEDGER BALANCE ---------- */
  const fetchBalance = async (start: string, end: string) => {
    try {
      setLoading(true);

      const data = await getLedgerBalanceApi({
        p_sdate: start,
        p_edate: end,
      });

      // if (data && data.length > 0) {
      //   setBalance(Number(data[0].balance ?? 0));
      // }
      if (data && data.length > 0) {
        // ✅ Only calculate mgrp === 1
        const totalCalculatedBalance = data.reduce(
          (total: number, item: LedgerItem) => {
            if (item.mgrp === 1) {
              return total + Number(item.balance ?? 0);
            }
            return total;
          },
          0,
        );

        setBalance(totalCalculatedBalance);
      }
    } catch (error) {
      console.error("Ledger fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  /* LEDGER */
  const fetchLedger = async (start: string, end: string) => {
    try {
      setLoading(true);

      const data = await getLedgerBalanceApi({
        p_sdate: start,
        p_edate: end,
      });

      // setLedger(data || []);

      // if (data && data.length > 0) {
      //   setBalance(Number(data[0].balance ?? 0));
      // }
      // if (data && data.length > 0) {
      //   // ✅ Only calculate mgrp === 1
      //   const totalCalculatedBalance = data.reduce(
      //     (total: number, item: LedgerItem) => {
      //       if (item.mgrp === 1) {
      //         return total + Number(item.balance ?? 0);
      //       }
      //       return total;
      //     },
      //     0,
      //   );

      //   setBalance(totalCalculatedBalance);
      // }

      // ✅ Show only mgrp === 1 records
      const filteredLedger = (data || []).filter(
        (item: LedgerItem) => item.mgrp === 1,
      );

      setLedger(filteredLedger);

      // ✅ Calculate total balance from mgrp === 1
      const totalCalculatedBalance = filteredLedger.reduce(
        (total: number, item: LedgerItem) => {
          return total + Number(item.balance ?? 0);
        },
        0,
      );

      setBalance(totalCalculatedBalance);
    } catch (error) {
      console.error("Ledger fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  const clearTransactions = () => {
    setTransactions([]);
    // setLedger([]);
  };

  return (
    <PaymentContext.Provider
      value={{
        transactions,
        loading,
        fetchTransactions,
        clearTransactions,
        balance,
        fetchBalance,
        ledger,
        fetchLedger,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
