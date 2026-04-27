import { useEffect, useState } from "react";
import { Search, Loader2, CheckCircle, CreditCard } from "lucide-react";
import { usePayment } from "../context";

export default function Cashview() {
  const { transactions, loading, fetchTransactions, clearTransactions } =
    usePayment();
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  /* ---------- FETCH ---------- */
  const handleFetch = async () => {
    if (!startDate || !endDate) return;

    // clearTransactions();
    await fetchTransactions(startDate, endDate);
  };

  /* ---------- FORMAT DATE ---------- */
  const formatDateTime = (date: string) => {
    const d = new Date(date);
    return d.toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    fetchTransactions(startDate, endDate);
  }, []);

  useEffect(() => {
    return () => {
      clearTransactions();
    };
  }, []);

  return (
    <div className="p-5 mx-auto">
      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-5">Cash Transactions</h1>

      {/* DATE FILTER */}
      <div className="bg-white rounded-2xl shadow border border-gray-300 p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputDate
            label="From"
            value={startDate}
            max={endDate}
            onChange={setStartDate}
          />

          <InputDate
            label="To"
            value={endDate}
            min={startDate}
            max={today}
            onChange={setEndDate}
          />

          <div className="sm:col-span-2 mt-3">
            <button
              onClick={handleFetch}
              disabled={!startDate || !endDate}
              className="w-full h-12 rounded-xl bg-blue-900 text-white font-semibold flex items-center justify-center gap-2 hover:bg-blue-950 disabled:bg-gray-300 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Search size={18} />
              )}
              {loading ? "Loading..." : "GET TRANSACTIONS"}
            </button>
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {loading ? (
          /* ✅ LOADER */
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin text-blue-500" size={28} />
          </div>
        ) : transactions.length === 0 ? (
          /* ✅ EMPTY STATE */

          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <CreditCard size={40} className="mb-3 text-gray-400" />
            <p className="text-center text-gray-500">
              No transactions found for selected range
            </p>
          </div>
        ) : (
          /* ✅ DATA */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {transactions.map((item) => (
              <div
                key={item.paymentorderid}
                className=" flex items-center justify-between bg-white  border border-gray-300 rounded-2xl p-4 shadow-sm"
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="text-green-600" size={22} />
                  </div>

                  <div>
                    <p className="font-semibold text-lg capitalize">
                      {item.paymode}
                    </p>

                    <p className="text-sm text-gray-500">
                      {formatDateTime(item.tr_date)}
                    </p>

                    {item.bank_reference && (
                      <p className="text-xs text-gray-400 italic">
                        Ref: {item.bank_reference}
                      </p>
                    )}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <p className="text-green-600 font-bold text-lg">
                    ₹{Number(item.paymentamount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </p>

                  <p className="text-xs text-green-600 font-semibold uppercase">
                    {item.transactionstatus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- DATE INPUT ---------- */
const InputDate = ({ label, value, onChange, min, max }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-2">
      {label}
    </label>

    <input
      type="date"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.currentTarget.showPicker()}
      onKeyDown={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm
      focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
);
