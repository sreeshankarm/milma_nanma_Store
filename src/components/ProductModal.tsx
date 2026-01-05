import { X, Sun, Moon, Clock} from "lucide-react";
import { useState, useEffect } from "react";
// import type { Product } from "../typesss/typesss";
import { getProductDetailsApi } from "../api/product.api";

import type { ModalProduct, ProductDetail } from "../types/product";
// import type { Product } from "../types/product";

// interface Props {
//   product: Product;
//   supplyDate: string;
//     initialQty?: number;
//   initialShift?: number;
//   onClose: () => void;
//   onConfirm: (qty: number,supplyShift: number) => void;
// }

interface Props {
  product: ModalProduct;
  supplyDate: string;
  initialQty?: number;
  initialShift?: number;
  onClose: () => void;
  onConfirm: (qty: number, supplyShift: number) => void;
}

export default function ProductModal({
  product,
  supplyDate,
  initialQty,
  initialShift,
  onClose,
  onConfirm,
}: Props) {
  // const [loading, setLoading] = useState(false);

  const [detailsLoading, setDetailsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [details, setDetails] = useState<ProductDetail | null>(null);

  // const [qty, setQty] = useState(1);
  // const [shift, setShift] = useState<"morning" | "evening">("morning");

  // const supplyShiftValue = shift === "morning" ? 1 : 2;

  const [qty, setQty] = useState(initialQty ?? 1);

  const [shift, setShift] = useState<"morning" | "evening">(
    initialShift === 2 ? "evening" : "morning"
  );

  const supplyShiftValue = shift === "morning" ? 1 : 2;

  /* 🔥 CALL PRODUCT DETAILS API */
  useEffect(() => {
    const fetchDetails = async () => {
      // setLoading(true);
      setDetailsLoading(true);

      try {
        const { data } = await getProductDetailsApi(
          supplyDate,
          product.prod_code
        );
        setDetails(data.productdetails[0]);
      } finally {
        // setLoading(false);
        setDetailsLoading(false);
      }
    };

    fetchDetails();
  }, [product.prod_code, supplyDate]);

  const price = Number(details?.final_rate || product.final_rate);
  const total = price * qty;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/40  flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-xl relative max-h-[90vh]  overflow-y-auto thin-scroll ">
        
             {/* ✅ DETAILS LOADER (USES detailsLoading → TS WARNING FIXED) */}
        {detailsLoading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-20 rounded-3xl">
            <span className="h-6 w-6 border-2 border-[#8e2d26] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 bg-gray-100 rounded-full"
        >
          <X size={20} className="text-gray-700 cursor-pointer" />
        </button>
        <img
          // src={product.image}
          // alt={product.name}
          src={product.imagepath}
          alt={product.prod_name}
          className="w-full h-32 object-contain mt-1  cursor-pointer "
        />

        {/* Product Name */}
        <h2 className="text-xl font-semibold mt-1">
          {/* {product.name} */}
          {details?.prod_name || product.prod_name}
        </h2>
        {/* {product.subtitle && (
          <p className="text-sm text-gray-600 -mt-1">{product.subtitle}</p>
        )} */}

        {/* {details?.uom_name && (
          <p className="text-sm text-gray-500">Unit: {details.uom_name}</p>
        )} */}

        {/* Quantity Selector */}
        <div className="mt-3 w-full bg-gray-100 rounded-2xl px-4 py-3 flex items-center justify-between">
          {/* Minus Button */}
          <button
            onClick={() => qty > 1 && setQty(qty - 1)}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-xl text-2xl font-light shadow-sm hover:bg-[#e5e7eb] transition"
          >
            –
          </button>

          {/* Number */}
          <span className="text-2xl font-semibold text-gray-800">{qty}</span>

          {/* Plus Button - Dark with shadow */}
          <button
            onClick={() => setQty(qty + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-2xl text-white bg-[#0a0f1c] shadow-[4px_4px_15px_rgba(0,0,0,0.25)] hover:bg-[#1e3a8a] transition"
          >
            +
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 mt-3">
          {/* Header */}
          <p className="font-semibold flex items-center gap-2 text-sm text-gray-800">
            <Clock size={16} className="text-orange-500" />
            Shift Selection
          </p>

          {/* Shift Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Morning */}
            <button
              onClick={() => setShift("morning")}
              className={`
        h-20 rounded-2xl flex flex-col items-center justify-center
        text-center space-y-1 transition
        ${
          shift === "morning"
            ? "bg-[#3b82f6] text-white shadow-lg"
            : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50"
        }
      `}
            >
              <Sun size={20} />
              <span className="text-sm font-semibold">Morning Shift</span>
              <span className="text-xs opacity-90">09:00 AM – 02:00 PM</span>
            </button>

            {/* Evening */}
            <button
              onClick={() => setShift("evening")}
              className={`
        h-20 rounded-2xl flex flex-col items-center justify-center
        text-center space-y-1 transition
        ${
          shift === "evening"
            ? "bg-[#3b82f6] text-white shadow-lg"
            : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50"
        }
      `}
            >
              <Moon size={20} />
              <span className="text-sm font-semibold">Evening Shift</span>
              <span className="text-xs opacity-90">03:00 PM – 08:00 AM</span>
            </button>
          </div>
        </div>

        {/* Cost Box */}
        <div className="mt-3 border rounded-2xl p-4 space-y-2 bg-gray-50">
          <div className="flex justify-between text-gray-600">
            <span>MRP</span>
            {/* <span>₹{product.mrp || product.price}</span> */}
            <span>₹{price.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-medium">
            <span>Your special price</span>
            {/* <span>₹{product.price}</span> */}
            <span>₹{price.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-green-600">
            <span>Profit per unit</span>
            {/* <span>₹{(product.mrp || 30) - product.price}</span> */}
            <span>₹{total.toFixed(2)}</span>
          </div>

          <hr />

          <div className="flex justify-between font-semibold text-red-600">
            <span>Cost of Items</span>
            {/* <span>₹{product.price * qty}</span> */}
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Confirm Button */}
        {/* <button
          disabled={loading}
          onClick={() => onConfirm(qty,supplyShiftValue)}
          className="w-full mt-6 bg-black text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#1e3a8a] transition cursor-pointer"
        >
          Confirm & Add
        </button> */}

        <button
          disabled={submitLoading}
          onClick={async () => {
            setSubmitLoading(true);
            try {
              await onConfirm(qty, supplyShiftValue);
            } finally {
              setSubmitLoading(false);
            }
          }}
          className={`w-full mt-6 py-3 rounded-xl text-lg font-semibold
    flex items-center justify-center gap-2 text-white transition
    ${
      submitLoading
        ? "bg-gray-700 cursor-not-allowed"
        : "bg-black hover:bg-[#1e3a8a]"
    }
  `}
        >
          {submitLoading && (
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {submitLoading ? "Adding..." : "Confirm & Add"}
        </button>
      </div>
    </div>
  );
}
