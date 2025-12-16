import { Calendar, X } from "lucide-react";

interface OrderFiltersProps {
  tab: "UPCOMING" | "PAST";
  setTab: (tab: "UPCOMING" | "PAST") => void;
  dateFilter: string;
  setDateFilter: (date: string) => void;
  creditAlerts: number;
    upcomingCount: number;  
  pastCount: number;  
}

export default function OrderFilters({
  tab,
  setTab,
  dateFilter,
  setDateFilter,
  creditAlerts,
    upcomingCount,
  pastCount,
}: OrderFiltersProps) {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-white border p-1 rounded-2xl flex gap-1">
          <button
            onClick={() => setTab("UPCOMING")}
            className={`flex-1 py-2 rounded-xl text-sm font-bold ${
              tab === "UPCOMING"
                ? "bg-blue-600 text-white"
                : "text-gray-600"
            }`}
          >
            Upcoming order({upcomingCount})
          </button>

          <button
            onClick={() => setTab("PAST")}
            className={`flex-1 py-2 rounded-xl text-sm font-bold ${
              tab === "PAST" ? "bg-slate-800 text-white" : "text-gray-600"
            }`}
          >
            Past order({pastCount})
          </button>
        </div>

        <div className="px-3 py-2 rounded-xl bg-amber-50 border text-amber-700 text-xs font-semibold">
          {creditAlerts} credit alerts
        </div>
      </div>

      {tab === "PAST" && (
        <div className="flex items-center gap-2 bg-white border p-3 rounded-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold bg-gray-100 px-2 py-1 rounded-lg">
            <Calendar size={14} />
            Filter
          </div>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1"
          />

          {dateFilter && (
            <button
              onClick={() => setDateFilter("")}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={16} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
