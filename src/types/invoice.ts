export interface DateRange {
  p_sdate: string;
  p_edate: string;
}

export interface BillItem {
  type: string;
  gid: number;
  prod_code: string | number;
  prod_name: string;
  inv_date: string;
  inv_no: number;
  inv_qty: number;
  ret_qty: number;
  net_amt: string;
  net_qty: number;
  inv_amt: number;
  ret_amt: number;
}

export interface InvoiceDetail {
  type: string;
  inv_gid: number;
  gid: number;
  prod_code: string | number;
  prod_name: string;
  inv_date: string;
  inv_no: number;
  qty: number;
  tot_amt: string;
  basic_rate: string;
  gst_per: number;
  veh_no: string;
  inv_shift: number;
}

export interface OrderInvoiceStatus {
  inv_gid: number;
  inv_no: number;
  inv_date: string;
  prod_code: number;
  prod_name: string;
  qty: string;
  inv_shift: number;
}

export interface OrderInvoiceStatusResponse {
  status: string;
  data?: OrderInvoiceStatus[];
  msg?: string;
}

export interface LastAvailableLocation {
  supplyshift: string;
  supplydate: string;
  current_latitude: string;
  current_longitude: string;
  trip_status: "RUNNING" | "COMPLETED" | "NOT_STARTED";
}

export interface InvoiceDetailsResponse {
  invoicedetails: InvoiceDetail[];
  lastavailablelocation?: LastAvailableLocation;
}
