import { RefreshCw, LineChart, History, Coins } from "lucide-react";

interface Props {
  repeatLastOrder: () => void;
  goToReturns: () => void;
  setActiveView: (v: string) => void;
}

export default function QuickActions({
  repeatLastOrder,
  setActiveView,
  goToReturns,
}: Props) {
  const itemCls =
    "bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 shadow-sm";

  return (
    <div className="grid grid-cols-4 gap-3">
      <button
        onClick={repeatLastOrder}
        className={`${itemCls} flex flex-col items-center justify-center text-center 
      cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105`}
      >
        <RefreshCw size={22} className="text-blue-500" />
        <span className="text-xs font-medium">Repeat Order</span>
      </button>

      <button
        onClick={() => setActiveView("ANALYTICS")}
        className={`${itemCls} flex flex-col items-center justify-center text-center 
      cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105`}
      >
        <LineChart size={22} className="text-purple-500" />
        <span className="text-xs font-medium">Sales Trend</span>
      </button>

      <button
        onClick={goToReturns}
        className={`${itemCls} flex flex-col items-center justify-center text-center 
      cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105`}
      >
        <History size={22} className="text-green-500" />
        <span className="text-xs font-medium">Damages & Return</span>
      </button>

      <button
        onClick={() => setActiveView("COMMISSIONS")}
        className={`${itemCls} flex flex-col items-center justify-center text-center 
      cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105`}
      >
        <Coins size={22} className="text-amber-500" />
        <span className="text-xs font-medium">Commission Rewards</span>
      </button>
    </div>
  );
}
