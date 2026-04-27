import { useState } from "react";
import { getMyOrdersApi, getOrderDetailsApi } from "../../api/order.api";
import type { Order, OrderDetail } from "../../types";
import { OrderContext } from "../../context/order/OrderContext";

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ GLOBAL DATE STATE
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const setDates = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  const fetchOrders = async (start: string, end: string) => {
    try {
      setLoading(true);

      const { data } = await getMyOrdersApi({
        startdate: start,
        enddate: end,
      });

      setOrders(data.myorders);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (gid: number) => {
    try {
      setLoading(true); // ✅ START LOADER

      const { data } = await getOrderDetailsApi({ gid });

      setOrderDetails(data.orderdetails);
    } finally {
      setLoading(false); // ✅ STOP LOADER
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        orderDetails,
        fetchOrders,
        fetchOrderDetails,
        loading,
        startDate,
        endDate,
        setDates,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
