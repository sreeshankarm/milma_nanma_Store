import { useState } from "react";
import { PaymentContext } from "../../context/Payment/PaymentContext";
import { transactionHistoryApi } from "../../api/payment.api";
import type { Transaction } from "../../types";

export const PaymentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async (start: string, end: string) => {
    const { data } = await transactionHistoryApi({
      startdate: start,
      enddate: end,
    });
    setTransactions(data.transactions ?? []);
  };

  return (
    <PaymentContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </PaymentContext.Provider>
  );
};
