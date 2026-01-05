import { createContext, useState } from "react";
import {
  getMyOrdersApi,
  getOrderDetailsApi,
} from "../../api/order.api";
import type { Order, OrderDetail } from "../../types";

interface OrderContextType {
  orders: Order[];
  orderDetails: OrderDetail[];
  fetchOrders: (start: string, end: string) => Promise<void>;
  fetchOrderDetails: (gid: number) => Promise<void>;
}

export const OrderContext =
  createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

  const fetchOrders = async (start: string, end: string) => {
    const { data } = await getMyOrdersApi({
      startdate: start,
      enddate: end,
    });
    setOrders(data.myorders);
  };

  const fetchOrderDetails = async (gid: number) => {
    const { data } = await getOrderDetailsApi({ gid });
    setOrderDetails(data.orderdetails);
  };

  return (
    <OrderContext.Provider
      value={{ orders, orderDetails, fetchOrders, fetchOrderDetails }}
    >
      {children}
    </OrderContext.Provider>
  );
};
