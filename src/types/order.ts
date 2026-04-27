/* ---------- ORDER ---------- */
export interface Order {
  gid: number;
  ind_date: string;
  ordertotal: string;
}

/* ---------- MY ORDERS ---------- */
export interface MyOrdersResponse {
  myorders: Order[];
}

/* ---------- ORDER DETAILS ---------- */



export interface OrderDetail {
  inddet_gid: number;
  supply_date: string;
  supply_shift: number;
  prod_code: number;
  prod_name: string;
  ind_qty: string;
  uom_name: string;
  rate: string;
  total: string;
  remarks: string | null;
final_rate:number;


  ind_dtl_status: string;
    imagepath?: string; // ✅ ADD THIS

}


export interface OrderDetailsResponse {
  orderdetails: OrderDetail[];
}
