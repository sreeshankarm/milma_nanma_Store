import { createContext } from "react";
import type { Order, OrderDetail } from "../../types";

export interface OrderContextType {
  orders: Order[];
  orderDetails: OrderDetail[];
  fetchOrders: (start: string, end: string) => Promise<void>;
  fetchOrderDetails: (gid: number) => Promise<void>;
}

export const OrderContext =
  createContext<OrderContextType | null>(null);
