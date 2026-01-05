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
  prod_name: string;
  ind_qty: string;
  total: string;
}

export interface OrderDetailsResponse {
  orderdetails: OrderDetail[];
}
