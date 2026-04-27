import { Trash2, Edit3 } from "lucide-react";
import type { CartItem } from "../types/cart";

interface Props {
  items: CartItem[];
  onIncrease: (item: CartItem) => void;
  onDecrease: (item: CartItem) => void;
  onRemove: (cartid: number) => void;
  onEdit: (item: CartItem) => void;
  removingId: number | null;
  canEdit: boolean;
}

export default function CartList({
  items,
  onRemove,
  onEdit,
  removingId,
  canEdit,
}: Props) {
  const getShiftLabel = (shift: number) => {
    switch (shift) {
      case 1:
        return "Morning Shift";
      case 2:
        return "Evening Shift";
      default:
        return "Unknown Shift";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };
  //   return (
  //     <div className="space-y-4">
  //       {items.map((item) => (
  //         <div
  //           key={item.cartid}
  //           className="bg-white border border-gray-200 rounded-xl shadow p-4 flex items-center gap-4"
  //         >
  //           <div className="relative">
  //             <img
  //               src={item.imagepath || "/placeholder.png"}
  //               alt={item.productname}
  //               className="w-16 h-16 object-contain"
  //             />

  //             {/* 🔥 SMALL BADGE */}
  //             <span className="absolute -top-2 -left-2 bg-gray-600 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
  //               #{item.prod_code}
  //             </span>
  //           </div>

  //           <div className="flex-1">
  //             <h3 className="font-semibold">{item.productname}</h3>

  //             <p className="text-gray-600 text-sm">
  //                 Qty : {item.quantity} nos | Rate : ₹ {Number(item.rate).toLocaleString()} | Total : ₹
  //               <span className="font-semibold text-[#0195db] ml-1">
  //                  {(Number(item.rate) * item.quantity).toLocaleString()}
  //               </span>
  //             </p>

  //             <p className="text-sm  text-gray-500 mt-1">
  //               {getShiftLabel(item.supplyshift)}
  //             </p>

  //             <p className="text-sm text-gray-500">
  //               {formatDate(item.supplydate)}
  //             </p>
  //           </div>

  //           {/* Qty Box */}
  //           <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 gap-4">
  //             <span className="text-lg font-semibold">{item.quantity}</span>
  //           </div>
  // {canEdit && (
  //           <div className="flex items-center gap-1 ml-1">
  //             <button
  //               onClick={() => onEdit(item)}
  //               className="p-2 rounded-lg hover:bg-blue-50 text-blue-600"
  //               title="Edit item"
  //             >
  //               <Edit3 size={18} />
  //             </button>

  //             <button
  //               onClick={() => onRemove(item.cartid)}
  //               disabled={removingId === item.cartid}
  //               className="p-2 rounded-lg hover:bg-red-50 text-red-500 disabled:opacity-60"
  //               title="Remove item"
  //             >
  //               {removingId === item.cartid ? (
  //                 <span
  //                   className="h-4 w-4 border-2 border-red-500 border-t-transparent
  //                  rounded-full animate-spin block"
  //                 />
  //               ) : (
  //                 <Trash2 size={18} />
  //               )}
  //             </button>
  //           </div>
  //           )}
  //         </div>
  //       ))}
  //     </div>
  //   );

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.cartid}
          className="bg-white border border-gray-200 rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center gap-3"
        >
          {/* 🔹 TOP SECTION */}
          <div className="flex items-center gap-4 w-full">
            {/* IMAGE */}
            <div className="relative ">
              <img
                src={item.imagepath || "/placeholder.png"}
                alt={item.productname}
                className="w-16 h-16 object-contain"
              />

              {/* <span className="absolute -top-2 -left-2 bg-gray-600 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
              #{item.prod_code}
            </span> */}
            </div>

            {/* DETAILS */}
            <div className="flex-1">
              <h3 className="font-semibold text-sm sm:text-base">
                {item.productname}
              </h3>

         
              <p className="text-gray-600 text-xs sm:text-sm">
                Qty : {item.quantity} nos | Rate : ₹{" "}
                {Number(item.rate).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}{" "}
                |{/* 🔹 TOTAL */}
                <span className="block sm:inline font-semibold text-[#0195db] sm:ml-1 mt-1 sm:mt-0">
                  Total : ₹{" "}
                  {(Number(item.rate) * item.quantity).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </p>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {getShiftLabel(item.supplyshift)}
              </p>

              <p className="text-xs sm:text-sm text-gray-500">
                {formatDate(item.supplydate)}
              </p>
            </div>
          </div>

          {/* 🔹 BOTTOM SECTION (Mobile Only) */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full">
            {/* Qty Box */}
            <div className="bg-gray-100 rounded-xl px-4 py-2">
              <span className="text-sm sm:text-lg font-semibold">
                {item.quantity}
              </span>
            </div>

            {/* Actions */}
            {canEdit && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 cursor-pointer"
                >
                  <Edit3 size={18} />
                </button>

                <button
                  onClick={() => onRemove(item.cartid)}
                  disabled={removingId === item.cartid}
                  className="p-2 rounded-lg hover:bg-red-50 text-red-500 disabled:opacity-60 cursor-pointer"
                >
                  {removingId === item.cartid ? (
                    <span className="h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin block" />
                  ) : (
                    <Trash2 size={18} />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
