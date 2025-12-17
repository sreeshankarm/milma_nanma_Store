import React from "react";
import {

  Clock,
  History,
  Wallet,
} from "lucide-react";
import { useStore } from "../context/store/store";

export const MyWalletView: React.FC = () => {
  const { balance } = useStore();

//   const totals = useMemo(() => {
//     const credit = transactions
//       .filter((t) => t.type === "CREDIT")
//       .reduce((sum, t) => sum + t.amount, 0);

//     const debit = transactions
//       .filter((t) => t.type === "DEBIT")
//       .reduce((sum, t) => sum + t.amount, 0);

//     return { credit, debit };
//   }, [transactions]);

//   const sortedTx = useMemo(
//     () =>
//       [...transactions].sort(
//         (a, b) => b.date.getTime() - a.date.getTime()
//       ),
//     [transactions]
//   );

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-6xl mx-auto px-6 space-y-8 animate-fade-in">

        {/* ===== Wallet Summary ===== */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <p className="text-xs uppercase tracking-widest text-emerald-100">
                My Wallet
              </p>

              <h1 className="text-4xl font-bold flex items-center gap-3 mt-2">
                <Wallet size={28} />
                ₹{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h1>

              <p className="text-emerald-100 mt-1">Available Balance</p>
            </div>

            <div className="flex gap-4">
              <div className="bg-white/15 rounded-2xl px-5 py-3">
                <p className="text-xs text-emerald-100">Total Credit</p>
                <p className="font-bold text-lg">
                  {/* ₹{totals.credit.toLocaleString()} */}
                   ₹555
                </p>
              </div>

              <div className="bg-white/15 rounded-2xl px-5 py-3">
                <p className="text-xs text-emerald-100">Total Debit</p>
                <p className="font-bold text-lg">
                  {/* ₹{totals.debit.toLocaleString()} */}
                   ₹ 344
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs mt-6 text-emerald-100">
            <Clock size={14} /> Live wallet balance
          </div>
        </div>

        {/* ===== Transactions Section ===== */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b dark:border-white/10">
            <div className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-100">
              <History size={18} />
              Wallet Transactions
            </div>
            <span className="text-sm text-gray-500">
              {/* {sortedTx.length} */}
              records
            </span>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-4 px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>Description</span>
            <span>Date</span>
            <span className="text-center">Type</span>
            <span className="text-right">Amount</span>
          </div>

          {/* Transactions */}
          <div className="divide-y dark:divide-white/5">
            {/* {sortedTx.map((tx) => (
              <div
                key={tx.id}
                className="grid grid-cols-4 px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-white/5 transition"
              >
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  {tx.description}
                </p>

                <p className="text-sm text-gray-500">
                  {tx.date.toLocaleString()}
                </p>

                <div className="flex justify-center">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      tx.type === "CREDIT"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tx.type}
                  </span>
                </div>

                <p
                  className={`text-right font-bold flex justify-end items-center gap-1 ${
                    tx.type === "CREDIT"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {tx.type === "CREDIT" ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                  ₹{tx.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            ))} */}
          </div>
        </div>

      </div>
    </div>
  );
};
