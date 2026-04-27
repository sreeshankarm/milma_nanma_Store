import React, { useEffect, useState } from "react";
import { Wallet, Clock, History, Loader2 } from "lucide-react";
import { usePayment } from "../context/Payment/usePayment";

export const MyWalletView: React.FC = () => {
  const { ledger, loading, balance, fetchLedger } = usePayment();

  /* DATE SETUP */
  const today = new Date().toISOString().split("T")[0];
  const format = (d: Date) => d.toISOString().split("T")[0];

  const todayDate = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(todayDate.getDate() - 7);

  const [startDate, setStartDate] = useState(format(sevenDaysAgo));
  const [endDate, setEndDate] = useState(format(todayDate));
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    //  const today = new Date().toISOString().split("T")[0];
    fetchLedger(startDate, endDate);
  }, []);

  /* TOTALS */
  const totalCredit = ledger.reduce((sum, item) => sum + Number(item.cr), 0);
  const totalDebit = ledger.reduce((sum, item) => sum + Number(item.dr), 0);

  return (
    <div className="min-h-screen py-6 sm:py-10">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* 🔷 WALLET + FILTER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* WALLET CARD */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-100">
                  My Wallet
                </p>

                <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-3 mt-2">
                  <Wallet size={26} />₹
                  {Number(balance).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </h1>

                <p className="text-emerald-100 mt-1">Available Balance</p>

                <div className="flex items-center gap-2 text-xs mt-4 text-emerald-100">
                  <Clock size={14} /> Live balance
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Stat title="Total Credit" value={Number(totalCredit).toLocaleString("en-IN", { minimumFractionDigits: 2 })} />
                <Stat title="Total Debit" value={Number(totalDebit).toLocaleString("en-IN", { minimumFractionDigits: 2 })} />
              </div>
            </div>
          </div>

          {/* DATE FILTER */}
          <div className="bg-white rounded-2xl  border border-gray-300 p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputDate
                label="Start Date"
                value={startDate}
                max={endDate}
                onChange={setStartDate}
              />

              <InputDate
                label="End Date"
                value={endDate}
                min={startDate}
                max={today}
                onChange={setEndDate}
              />

              <div className="sm:col-span-2 mt-3">
                {/* <button
                  onClick={() => fetchLedger(startDate, endDate)}
                  disabled={!startDate || !endDate}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300  text-white font-semibold py-2.5 rounded-xl transition active:scale-[0.98]"
                >
                Show Transactions
                </button> */}
                <button
                  onClick={async () => {
                    setBtnLoading(true);
                    await fetchLedger(startDate, endDate);
                    setBtnLoading(false);
                  }}
                  disabled={!startDate || !endDate}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-semibold py-2.5 rounded-xl transition active:scale-[0.98] cursor-pointer"
                >
                  {btnLoading && <Loader2 className="animate-spin" size={18} />}
                  {btnLoading ? "Loading..." : "Show Transactions"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 🔷 LEDGER TABLE */}
        <div className="bg-white rounded-2xl border border-gray-300  overflow-hidden">
          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <History size={18} /> Wallet Activity
            </div>
            <span className="text-sm text-gray-500">
              Showing {ledger.length} Records
            </span>
          </div>

          {/* TABLE */}
          {/* <div className="overflow-x-auto max-h-[500px]">
            <table className="min-w-full text-sm divide-y divide-gray-200">
              <thead className="bg-gray-100 text-xs uppercase text-gray-500 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left">Description</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-right">Credit</th>
                  <th className="px-6 py-3 text-right">Debit</th>
                  <th className="px-6 py-3 text-right">Balance</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {loading && (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                )}

                {!loading && ledger.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400">
                      No records found
                    </td>
                  </tr>
                )}

                {ledger.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.descn}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {new Date(item.tr_date).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-right font-semibold text-emerald-600">
                      {Number(item.cr) > 0
                        ? `₹${Number(item.cr).toFixed(2)}`
                        : "-"}
                    </td>

                    <td className="px-6 py-4 text-right font-semibold text-red-500">
                      {Number(item.dr) > 0
                        ? `₹${Number(item.dr).toFixed(2)}`
                        : "-"}
                    </td>

                    <td
                      className={`px-6 py-4 text-right font-bold ${
                        Number(item.balance) < 0
                          ? "text-red-600"
                          : "text-gray-800"
                      }`}
                    >
                      ₹{Number(item.balance).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}

          <div className="relative bg-white rounded-2xl border border-gray-300  overflow-hidden">
            {/* TABLE SCROLL */}
            <div className="overflow-x-auto max-h-[500px]">
              <table className="min-w-full text-sm">
                {/* HEAD */}
                <thead className="bg-gray-100 text-xs uppercase text-gray-500 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left">Description</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-right">Credit</th>
                    <th className="px-6 py-3 text-right">Debit</th>
                    <th className="px-6 py-3 text-right">Balance</th>
                  </tr>
                </thead>

                {/* BODY */}
                <tbody className="divide-y">
                  {/* ✅ SKELETON LOADING */}
                  {loading &&
                    Array.from({ length: 6 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-6 py-4">
                          <div className="h-4 w-40 bg-gray-200 rounded"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="h-4 w-16 ml-auto bg-gray-200 rounded"></div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="h-4 w-16 ml-auto bg-gray-200 rounded"></div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="h-4 w-20 ml-auto bg-gray-200 rounded"></div>
                        </td>
                      </tr>
                    ))}

                  {/* ✅ EMPTY STATE */}
                  {!loading && ledger.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-12">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <p className="text-sm font-medium">
                            No Transactions Found
                          </p>
                          <p className="text-xs mt-1">
                            Try selecting a different date range
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* ✅ DATA */}
                  {!loading &&
                    ledger.map((item, i) => (
                      <tr
                        key={i}
                        className="hover:bg-gray-50 transition duration-150"
                      >
                        <td className="px-6 py-4 font-medium text-gray-800">
                          {item.descn}
                        </td>

                        <td className="px-6 py-4 text-gray-500">
                          {new Date(item.tr_date).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-4 text-right font-semibold text-emerald-600">
                          {Number(item.cr) > 0
                            ? `₹${Number(item.cr).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
                            : "-"}
                        </td>

                        <td className="px-6 py-4 text-right font-semibold text-red-500">
                          {Number(item.dr) > 0
                            ? `₹${Number(item.dr).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
                            : "-"}
                        </td>

                        <td
                          className={`px-6 py-4 text-right font-bold ${
                            Number(item.balance) < 0
                              ? "text-red-600"
                              : "text-gray-800"
                          }`}
                        >
                          ₹{Number(item.balance).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* ✅ PREMIUM OVERLAY LOADER */}
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md">
                <Loader2 className="animate-spin text-emerald-500" size={33} />
                <p className="text-sm text-gray-600 mt-3 font-medium">
                  Fetching Transactions...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* 🔹 COMPONENTS */

const Stat = ({ title, value }: any) => (
  <div className="bg-white/15 backdrop-blur-md rounded-2xl px-6 py-4">
    <p className="text-xs text-emerald-100">{title}</p>
    <p className="font-bold text-lg">
      ₹{value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
    </p>
  </div>
);

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
      className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
    />
  </div>
);
