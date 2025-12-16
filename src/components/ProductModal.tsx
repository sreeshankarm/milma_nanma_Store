import { X } from "lucide-react";
import { useState } from "react";
import type { Product } from "../types/types";

interface Props {
  product: Product;
  onClose: () => void;
  onConfirm: (qty: number) => void;
}

export default function ProductModal({ product, onClose, onConfirm }: Props) {
  const [qty, setQty] = useState(1);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/40  flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 bg-gray-100 rounded-full"
        >
          <X size={20} className="text-gray-700" />
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-32 object-contain mt-4 transition-transform duration-300 cursor-pointer hover:scale-105"
        />

        {/* Product Name */}
        <h2 className="text-xl font-semibold mt-6">{product.name}</h2>
        {/* {product.subtitle && (
          <p className="text-sm text-gray-600 -mt-1">{product.subtitle}</p>
        )} */}

        {/* Quantity Selector */}
        <div className="mt-6 w-full bg-gray-100 rounded-2xl px-4 py-3 flex items-center justify-between">
          {/* Minus Button */}
          <button
            onClick={() => qty > 1 && setQty(qty - 1)}
            className="w-12 h-12 flex items-center justify-center bg-white rounded-xl text-2xl font-light shadow-sm hover:bg-[#e5e7eb] transition"
          >
            –
          </button>

          {/* Number */}
          <span className="text-2xl font-semibold text-gray-800">{qty}</span>

          {/* Plus Button - Dark with shadow */}
          <button
            onClick={() => setQty(qty + 1)}
            className="w-12 h-12 flex items-center justify-center rounded-xl text-2xl text-white bg-[#0a0f1c] shadow-[4px_4px_15px_rgba(0,0,0,0.25)] hover:bg-[#1e3a8a] transition"
          >
            +
          </button>
        </div>

        {/* Cost Box */}
        <div className="mt-6 border rounded-2xl p-4 space-y-2 bg-gray-50">
          <div className="flex justify-between text-gray-600">
            <span>MRP</span>
            <span>₹{product.mrp || product.price}</span>
          </div>

          <div className="flex justify-between font-medium">
            <span>Your special price</span>
            <span>₹{product.price}</span>
          </div>

          <div className="flex justify-between text-green-600">
            <span>Profit per unit</span>
            <span>₹{(product.mrp || 30) - product.price}</span>
          </div>

          <hr />

          <div className="flex justify-between font-semibold text-red-600">
            <span>Cost of Items</span>
            <span>₹{product.price * qty}</span>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={() => onConfirm(qty)}
          className="w-full mt-6 bg-black text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#1e3a8a] transition"
        >
          Confirm & Add
        </button>
      </div>
    </div>
  );
}
