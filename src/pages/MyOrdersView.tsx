import { useState, useEffect } from "react";
import { useStore } from "../context/store/store";
import HeaderCard from "../components/orders/HeaderCard";
import StatsCards from "../components/orders/StatsCards";
import OrderFilters from "../components/orders/OrderFilters";
import OrderList from "../components/orders/OrderList";
import type { Order } from "../typesss/typesss"; // type-only import
import { OrderStatus } from "../typesss/typesss"; // value import
import { useNavigate } from "react-router-dom";


const MyOrdersView: React.FC = () => {
  const {
    orders,
    setActiveView,
    modifyOrder,
    setSelectedOrderIdForReturn,
    returnIntentMessage,
    setReturnIntentMessage,
  } = useStore();
   
  
  const navigate = useNavigate();
  

  const [tab, setTab] = useState<"UPCOMING" | "PAST">("UPCOMING");
  const [dateFilter, setDateFilter] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // -------------------------------
  // FILTER ORDERS
  // -------------------------------

  const filtered = orders.filter((o: Order) => {
    const isPast = o.status === OrderStatus.COMPLETED;

    if (tab === "UPCOMING" && isPast) return false;
    if (tab === "PAST" && !isPast) return false;

    if (tab === "PAST" && dateFilter) {
      const d = new Date(o.createdAt).toISOString().split("T")[0];
      if (d !== dateFilter) return false;
    }

    return true;
  });

  useEffect(() => {
    if (filtered.length && !expandedOrderId) {
      setExpandedOrderId(filtered[0].id);
    }
  }, [filtered]);

  const upcomingCount = orders.filter(
    (o: Order) => o.status === OrderStatus.UPCOMING
  ).length;
  const pastCount = orders.filter(
    (o: Order) => o.status !== OrderStatus.UPCOMING
  ).length;

  return (
    <div className="p-4 pb-24 h-full flex flex-col space-y-3">
      <HeaderCard
        returnIntentMessage={returnIntentMessage}
        clearReturn={() => setReturnIntentMessage(null)}
        openReturns={() => navigate("/damagesReturn")}
      />

      <StatsCards orders={orders} />

      <OrderFilters
        tab={tab}
        setTab={setTab}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        creditAlerts={
          orders.filter((o: Order) =>
            o.remarks?.some((r: string) => r.toLowerCase().includes("credit"))
          ).length
        }
        upcomingCount={upcomingCount}
        pastCount={pastCount}
      />

      <OrderList
        orders={filtered}
        expanded={expandedOrderId}
        setExpanded={setExpandedOrderId}
        modifyOrder={modifyOrder}
        setActiveView={setActiveView}
        setReturnOrder={setSelectedOrderIdForReturn}
        clearReturnMsg={() => setReturnIntentMessage(null)}
      />
    </div>
  );
};

export default MyOrdersView;
