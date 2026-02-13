export interface TransactionPayload {
  startdate: string;
  enddate: string;
}

export interface Transaction {
  paymentorderid: number;
  tr_date: string;
  paymentamount: string;
  bank_reference?: string;
  paymode: string;
  transactionstatus: string;
  statuscode: number;
}
