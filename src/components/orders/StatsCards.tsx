import { Truck, History } from "lucide-react";
import type { Order } from "../../typesss/typesss";
import { OrderStatus } from "../../typesss/typesss";

interface StatsCardsProps {
  orders: Order[];
}

export default function StatsCards({ orders }: StatsCardsProps) {
 const upcoming = orders.filter((o) => o.status === OrderStatus.UPCOMING);
const past = orders.filter((o) => o.status !== OrderStatus.UPCOMING);


  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-gradient-to-r from-emerald-50 to-sky-50 border border-emerald-100 rounded-2xl p-4 flex justify-between items-center">
  <div>
    <p className="text-xs text-emerald-700 font-semibold">Upcoming orders</p>
    <p className="text-3xl text-emerald-700 font-extrabold">{upcoming.length}</p>
    <p className="text-xs text-emerald-700 font-semibold">Across live, loaded, and confirmed</p>
  </div>

  <div className="bg-emerald-500/10 p-3 rounded-full flex items-center justify-center">
    <Truck size={25} className="text-emerald-700" />
  </div>
</div>


    <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white p-4 rounded-2xl flex justify-between items-center">
  <div>
    <p className="text-xs font-semibold text-white/70">Past orders</p>
    <p className="text-3xl font-extrabold">{past.length}</p>
    <p className="text-xs font-semibold text-white/70">Delivered and invoiced</p>
  </div>

  <div className="bg-white/10 p-3 rounded-full flex items-center justify-center">
    <History size={25} className="text-white" />
  </div>
</div>

    </div>
  );
}
