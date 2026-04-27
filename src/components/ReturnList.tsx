import React from "react";
import type { InvoiceGroup, Acknowledgement } from "../types";
import { RotateCw } from "lucide-react";

interface Props {
  items: InvoiceGroup[];
  loading: boolean;
  onSelect: (inv: InvoiceGroup) => void;
  acknowledgements?: Acknowledgement[];
}

const ReturnList: React.FC<Props> = ({ items, loading, onSelect }) => {
  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-6 w-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  /* ---------- EMPTY ---------- */
  if (!items.length) {
       return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <RotateCw size={40} className="mb-3 text-gray-400" />
        <p className="text-center text-gray-500">
          No return requests found for selected range
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((inv) => {
        const total = inv.items.reduce(
          (sum, i) => sum + Number(i.basic_amt),
          0,
        );

        const hasAck = inv.items.some(
          (item) => (item.acknowledgements?.length ?? 0) > 0,
        );

        return (
          <div
            key={inv.inv_gid}
            onClick={() => onSelect(inv)}
            // className="
            //   cursor-pointer
            //   bg-white
            //   border border-gray-200
            //   rounded-2xl
            //   shadow-sm
            //   hover:shadow-xl
            //   hover:-translate-y-1
            //   transition-all duration-200

            //   flex flex-col
            //   h-full
            // "

            className={`
            cursor-pointer
            bg-white
            border
            rounded-2xl
            shadow-sm
            hover:shadow-xl
            hover:-translate-y-1
            transition-all duration-200
            flex flex-col h-full

            ${
              hasAck
                ? "border-red-400 ring-1 ring-red-200 bg-red-50 "
                : "border-gray-200 hover:border-gray-300"
            }
          `}
          >
            {/* ================= HEADER ================= */}
            <div className="px-5 pt-5 pb-4 flex items-start justify-between">
              {/* LEFT */}
              <div className="min-w-0">
                <p className="text-base font-semibold text-gray-900 truncate">
                  Inv: {inv.inv_no}
                </p>

                <p className="text-xs text-gray-500 mt-1 truncate">
                  Vehicle: {inv.vehicle_full}
                </p>
              </div>

              {/* RIGHT (DATE BADGE) */}
              <div className="ml-3 shrink-0">
                <span
                  className="
                  inline-flex items-center
                  text-xs font-medium
                  bg-blue-50 text-blue-600
                  px-3 py-1
                  rounded-full
                "
                >
                  {inv.inv_date}
                </span>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="border-t border-gray-100" />

            {/* ================= BODY ================= */}
            <div className="px-5 py-4 flex-1 flex flex-col">
              {/* TITLE */}
              <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                Items in Invoice
              </p>

              {/* ITEMS */}
              <div className="space-y-2 flex-1">
                {inv.items.map((item) => (
                  <div
                    key={item.invdet_gid}
                    className="
                      grid grid-cols-[1fr_auto_auto]
                      items-center
                      gap-3
                    "
                  >
                    {/* PRODUCT */}
                    <p className="text-sm text-gray-800 truncate">
                      {item.prod_name}
                    </p>

                    {/* QTY */}
                    <p className="text-xs text-gray-500 text-right min-w-[55px]">
                      Qty: {item.qty}
                    </p>

                    {/* PRICE */}
                    <p className="text-sm font-semibold text-emerald-600 text-right min-w-[80px]">
                      ₹{Number(item.basic_amt).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= FOOTER ================= */}
            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50 rounded-b-2xl">
              {/* LEFT */}
              <p className="text-xs text-gray-500 font-medium">
                {inv.items.length} Items
              </p>

              {/* RIGHT (TOTAL) */}
              <div className="text-right">
                <p className="text-xs text-gray-400 leading-none">Total</p>
                <p className="text-lg font-bold text-emerald-600 leading-tight">
                  ₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReturnList;
