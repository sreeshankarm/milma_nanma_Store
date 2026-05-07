import { useEffect, useState } from "react";
import { Search, FileText, Receipt, Loader2 } from "lucide-react";
import { useInvoice } from "../context";
import { toast } from "react-toastify";

export default function TransactionsView() {
  const {
    bills,
    loading,
    fetchBills,
    printInvoice,
    printCashReceipt,
    clearTransactions,
  } = useInvoice();
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  // ✅ per button loader
  const [invoiceLoadingId, setInvoiceLoadingId] = useState<string | null>(null);
  const [receiptLoadingId, setReceiptLoadingId] = useState<string | null>(null);

  /* ---------- FETCH BILLS ---------- */

  const handleFetch = async () => {
    if (!startDate || !endDate) return;

    await fetchBills(startDate, endDate);
  };

  /* ---------- PRINT HANDLERS ---------- */
  const handleInvoice = async (gid: string, date: string) => {
    try {
      setInvoiceLoadingId(gid);
      await printInvoice(gid, date);
    } catch (err: any) {
      toast.error(
        err?.message || err?.response?.data?.error || "Invoice download failed",
      );
    } finally {
      setInvoiceLoadingId(null);
    }
  };

  const handleReceipt = async (gid: string, date: string) => {
    try {
      setReceiptLoadingId(gid);
      await printCashReceipt(gid, date);
    } catch (err: any) {
      toast.error(
        err?.message || err?.response?.data?.error || "Receipt download failed",
      );
    } finally {
      setReceiptLoadingId(null);
    }
  };

  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    fetchBills(startDate, endDate);
  }, []);

  useEffect(() => {
    return () => {
      clearTransactions();
    };
  }, []);

  return (
    <div className="p-5  mx-auto">
      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-5">Transactions</h1>

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
            max={today} // ✅ disable future dates
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
              {loading ? "Loading..." : "GET BILLS"}
            </button>
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="min-h-[200px]">
        {loading ? (
          /* ✅ LIST LOADER (CENTER) */
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin text-blue-500" size={28} />
          </div>
        ) : bills.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <FileText size={40} className="mb-3 text-gray-400" />
            <p className="text-center">No bills found for selected range</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
   

            {bills.map((bill, index) => {
              const isLoading =
                invoiceLoadingId === String(bill.gid) ||
                receiptLoadingId === String(bill.gid);

              const handleClick = async () => {
                if (bill.type === "invoice") {
                  await handleInvoice(String(bill.gid), bill.inv_date);
                } else if (bill.type === "cash") {
                  await handleReceipt(String(bill.gid), bill.inv_date);
                }
              };

              const isInvoice = bill.type === "invoice";

              return (
                <div
                  key={`${bill.gid}-${index}`}
                  onClick={handleClick}
                  className={`
        group bg-white rounded-2xl border border-gray-200 
        shadow-sm hover:shadow-lg hover:-translate-y-[2px]
        transition-all duration-200 cursor-pointer
        p-4 active:scale-[0.98]
        ${isLoading ? "opacity-70 pointer-events-none" : ""}
      `}
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* LEFT SECTION */}
                    <div className="flex gap-3">
                      {/* ICON */}
                      <div
                        className={`
              w-11 h-11 flex items-center justify-center rounded-xl
              ${isInvoice ? "bg-blue-100" : "bg-green-100"}
            `}
                      >
                        {isInvoice ? (
                          <FileText className="text-blue-700" size={18} />
                        ) : (
                          <Receipt className="text-green-700" size={18} />
                        )}
                      </div>

                      {/* TEXT */}
                      <div className="space-y-1">
                        {/* INV NO */}
                        <p className="text-sm font-semibold text-blue-600 group-hover:underline">
                          {bill.inv_no}
                        </p>

                        {/* TITLE */}
                        <p className="text-[15px] font-medium text-gray-900 leading-tight">
                          {bill.prod_name}
                        </p>

                        {/* DATE + TYPE */}
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{bill.inv_date}</span>

                          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>

                          <span
                            className={`
                  px-2 py-[2px] rounded-md text-[10px] font-semibold tracking-wide
                  ${
                    isInvoice
                      ? "bg-blue-50 text-blue-700"
                      : "bg-green-50 text-green-700"
                  }
                `}
                          >
                            {bill.type.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="text-right flex flex-col items-end justify-between h-full">
                      {isLoading ? (
                        <Loader2
                          className="animate-spin text-gray-500"
                          size={18}
                        />
                      ) : (
                        <p className="text-lg font-semibold text-green-600">
                          ₹
                          {Number(bill.net_amt).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      )}

                      {/* subtle arrow */}
                      <span className="text-xs text-gray-400 group-hover:text-gray-600 mt-2">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
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
