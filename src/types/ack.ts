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

/* ✅ ACKNOWLEDGEMENT TYPES */

export interface Acknowledgement {
  ack_gid: number;
  remarks: string | null;
  received_date: string | null;
  veh_no: string | null;
  faults: FaultSplit[];
}

/* ✅ ADD THIS BELOW */

export interface InvoiceGroup {
  inv_gid: number;
  inv_no: number;
  inv_date: string;
  vehicle_full: string;
  items: {
    invdet_gid: number;
    prod_name: string;
    qty: number;
    basic_amt: number;
    prod_code: number;
    // ✅ ADD THIS LINE
    acknowledgements?: Acknowledgement[];
  }[];
}

export interface AckListPayload {
  p_sdate: string;
  p_edate: string;
}

// export interface SaveAckPayload {
//   inv_gid: number;
//   invdet_gid: number;
//   vehicleno: string;
//   receivedtime: string;
//   faulttype: number;
//   remarks?: string;
// }

export interface FaultSplit {
  fault_id: number;
  fault_name: string;
  qty: number;
}

export interface SaveAckItem {
  inv_gid: number;
  invdet_gid: number;
  faults: FaultSplit[];
  remarks?: string;
}

export interface SaveAckPayload {
  items: SaveAckItem[];
}

export interface AckSuccess {
  status: string;
  saved: number;
  errors: string[];
  msg: string;
}
