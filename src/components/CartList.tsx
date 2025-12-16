import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "../types/types";

interface Props {
  items: CartItem[];
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function CartList({ items, onIncrease, onDecrease, onRemove }: Props) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.product.id}
          className="bg-white border border-gray-200 rounded-xl shadow p-4 flex items-center gap-4"
        >
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-16 h-16 object-contain"
          />

          <div className="flex-1">
            <h3 className="font-semibold">{item.product.name}</h3>
            <p className="text-gray-500 text-sm">₹{item.product.price} / unit</p>
          </div>

          {/* Qty Box */}
          <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 gap-4">
            <button
              onClick={() => onDecrease(item.product.id)}
              className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow"
            >
              <Minus size={16} />
            </button>

            <span className="text-lg font-semibold">{item.quantity}</span>

            <button
              onClick={() => onIncrease(item.product.id)}
              className="w-8 h-8 flex items-center justify-center bg-[#0f172a] text-white rounded-lg shadow"
            >
              <Plus size={16} />
            </button>
          </div>

          <Trash2
            className="text-red-500 cursor-pointer"
            onClick={() => onRemove(item.product.id)}
          />
        </div>
      ))}
    </div>
  );
}
