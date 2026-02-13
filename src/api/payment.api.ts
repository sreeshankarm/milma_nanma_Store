import api from "./axios";
import type { TransactionPayload, Transaction } from "../types";


interface TransactionResponse {
  transactions: Transaction[];
  startdate: string;
  enddate: string;
}

export const transactionHistoryApi = (payload: TransactionPayload) =>
  api.post<TransactionResponse>("/transactionhistory", payload);




export const getPaymentFormHtml = async (balance?: number) => {
  const params = balance !== undefined ? { balance } : {};

  const response = await api.get("/paymentform", {
    params,
    responseType: "text", // VERY IMPORTANT
  });

  return response.data; // HTML string
};






