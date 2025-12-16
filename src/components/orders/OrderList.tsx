import type { Order } from "../../types/types";
import OrderCard from "./OrderCard";

interface OrderListProps {
  orders: Order[];
  expanded: string | null;
  setExpanded: (id: string | null) => void;
  modifyOrder: (orderId: string) => void;
  setActiveView: (view: string) => void;
  setReturnOrder: (orderId: string) => void;
  clearReturnMsg: () => void;
}

export default function OrderList({
  orders,
  expanded,
  setExpanded,
  modifyOrder,
  setActiveView,
  setReturnOrder,
  clearReturnMsg,
}: OrderListProps) {
  if (orders.length === 0)
    return (
      <div className="p-6 border border-dashed rounded-2xl text-center text-gray-500">
        No orders in this view yet.
      </div>
    );

  return (
    <div className="space-y-4 overflow-y-auto flex-1">
      {orders.map((o) => (
        <OrderCard
          key={o.id}
          order={o}
          expanded={expanded === o.id}
          toggleExpand={() => setExpanded(expanded === o.id ? null : o.id)}
          modifyOrder={modifyOrder}
          setActiveView={setActiveView}
          setReturnOrder={setReturnOrder}
          clearReturnMsg={clearReturnMsg}
        />
      ))}
    </div>
  );
}
