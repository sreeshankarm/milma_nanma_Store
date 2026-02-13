export interface AckItem {
  fault_type: number | null;
  remarks: string | null;
  received_date: string | null;
  ackveh_no: string | null;
  ackgid: number | null;
  inv_gid: number;
  inv_no: number;
  inv_date: string;
  veh_no: string;
  prod_name: string;
  invdet_gid: number;
  qty: number;
  basic_amt: string;
}

export interface FaultType {
  id: number;
  name: string;
}

export interface AckListPayload {
  p_sdate: string;
  p_edate: string;
}

export interface SaveAckPayload {
  inv_gid: number;
  invdet_gid: number;
  vehicleno: string;
  receivedtime: string;
  faulttype: number;
  remarks?: string;
}
