import { Trash2, Edit3 } from "lucide-react";
// import type { CartItem } from "../typesss/typesss";
import type { CartItem } from "../types/cart";
import { useState } from "react";

interface Props {
  // items: CartItem[];
  // onIncrease: (id: string) => void;
  // onDecrease: (id: string) => void;
  // onRemove: (id: string) => void;

  items: CartItem[];
  onIncrease: (item: CartItem) => void;
  onDecrease: (item: CartItem) => void;
  onRemove: (cartid: number) => void;
  onEdit: (item: CartItem) => void;
}

export default function CartList({
  items,
  // onIncrease,
  // onDecrease,
  onRemove,
  onEdit,
}: Props) {
  const [removingId, setRemovingId] = useState<number | null>(null);

  const handleRemove = async (cartid: number) => {
    setRemovingId(cartid);
    try {
      await onRemove(cartid);
    } finally {
      setRemovingId(null);
    }
  };
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.cartid}
          className="bg-white border border-gray-200 rounded-xl shadow p-4 flex items-center gap-4"
        >
          <img
            // src={item.product.image}
            // alt={item.product.name}
            className="w-16 h-16 object-contain"
          />

          <div className="flex-1">
            <h3 className="font-semibold">{item.productname}</h3>
            <p className="text-gray-500 text-sm">
              {/* ₹{item.product.price}  */} ₹{item.rate} × {item.quantity}/
              unit
            </p>
          </div>

          {/* Qty Box */}
          <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 gap-4">
            {/* <button
              onClick={() => onDecrease(item)}
              className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow"
            >
              <Minus size={16} />
            </button> */}

            <span className="text-lg font-semibold">{item.quantity}</span>

            {/* <button
              onClick={() => onIncrease(item)}
              className="w-8 h-8 flex items-center justify-center bg-[#0f172a] text-white rounded-lg shadow"
            >
              <Plus size={16} />
            </button> */}
          </div>

          {/* <Trash2
            className="text-red-500 cursor-pointer"
            // onClick={() => onRemove(item.product.id)}
            onClick={() => onRemove(item.cartid)}
          /> */}

          <div className="flex items-center gap-1 ml-1">
            <button
              onClick={() => onEdit(item)}
              className="p-2 rounded-lg hover:bg-blue-50 text-blue-600"
              title="Edit item"
            >
              <Edit3 size={18} />
            </button>

            {/* <button
              onClick={() => onRemove(item.cartid)}
              className="p-2 rounded-lg hover:bg-red-50 text-red-500"
              title="Remove item"
            >
              <Trash2 size={18} />
            </button> */}

            <button
              onClick={() => handleRemove(item.cartid)}
              disabled={removingId === item.cartid}
              className="p-2 rounded-lg hover:bg-red-50 text-red-500 disabled:opacity-60"
              title="Remove item"
            >
              {removingId === item.cartid ? (
                <span
                  className="h-4 w-4 border-2 border-red-500 border-t-transparent 
                 rounded-full animate-spin block"
                />
              ) : (
                <Trash2 size={18} />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
