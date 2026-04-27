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


export interface LedgerPayload {
  p_sdate: string;
  p_edate: string;
}

export interface LedgerItem {
  gid: number;
  mgrp: number;
  grp: number;
  party_gid: number;
  unit_id: number;
  descn: string;
  tr_date: string;
  cr: string;
  dr: string;
  balance: string;
}