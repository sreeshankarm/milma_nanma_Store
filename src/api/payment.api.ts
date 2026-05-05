import api from "./axios";
import type { TransactionPayload, Transaction ,LedgerItem, LedgerPayload} from "../types";



interface TransactionResponse {
  transactions: Transaction[];
  startdate: string;
  enddate: string;
}

export const transactionHistoryApi = (payload: TransactionPayload) =>
  api.post<TransactionResponse>("/transactionhistory", payload);




// export const getPaymentFormHtml = async (balance?: number) => {
//   const params = balance !== undefined ? { balance } : {};

//   const response = await api.get("/paymentform", {
//     params,
//     responseType: "text", // VERY IMPORTANT
//   });

//   return response.data; // HTML string
// };


export const getPaymentFormHtml = async (balance?: number) => {
  const response = await api.get("/paymentform", {
    params: balance !== undefined ? { balance } : {},
    responseType: "text", // IMPORTANT: because backend returns HTML
  });

  return response.data;
};





/* ---------- LEDGER BALANCE ---------- */
// export const getLedgerBalanceApi = async (payload: LedgerPayload) => {
//   const form = new FormData();

//   form.append("p_sdate", payload.p_sdate);
//   form.append("p_edate", payload.p_edate);

//   const { data } = await api.post<LedgerItem[]>("/myledger", form, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return data;
// };

export const getLedgerBalanceApi = async (payload: LedgerPayload) => {
  const form = new FormData();

  form.append("p_sdate", payload.p_sdate);
  form.append("p_edate", payload.p_edate);

  const { data } = await api.post<LedgerItem[]>("/myledger", form);

  return data;
};
