import {
  Clock,
  ChevronDown,
  ChevronUp,
  Download,
  AlertOctagon,
} from "lucide-react";

import type { Order, Product } from "../../types/types";
import { OrderStatus } from "../../types/types";
import { useState } from "react";
import ReturnRequestModal from "../ReturnRequestModal";
import { useStore } from "../../context/store/store";

interface OrderCardProps {
  order: Order;
  expanded: boolean;
  toggleExpand: () => void;
  modifyOrder: (id: string) => void;
  setActiveView: (view: string) => void;
  setReturnOrder: (orderId: string) => void;
  clearReturnMsg: () => void;
}

export default function OrderCard({
  order,
  expanded,
  toggleExpand,
  setActiveView,
  setReturnOrder,
  clearReturnMsg,
}: OrderCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { products } = useStore();

  return (
    <div className="bg-white border border-gray-300 p-4 rounded-2xl shadow relative">
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock size={12} />
            {new Date(order.createdAt).toLocaleDateString()}
          </div>

          <h3 className="font-bold text-lg">{order.id}</h3>
        </div>

        <div className="text-right">
          <span className="text-[11px] px-3 py-1 rounded-full border font-bold">
            {order.status}
          </span>

          <p className="text-2xl font-extrabold">₹{order.totalAmount}</p>
        </div>
      </div>

      <button
        onClick={toggleExpand}
        className="mt-3 inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg border"
      >
        {expanded ? (
          <>
            Hide breakdown <ChevronUp size={14} />
          </>
        ) : (
          <>
            View breakdown <ChevronDown size={14} />
          </>
        )}
      </button>

      {expanded && (
        <div className="mt-4 space-y-2 text-sm">
          {order.items.map((i, x) => (
            <div key={x} className="flex justify-between">
              <span>
                {x + 1}. {i.name} × {i.quantity}
              </span>
              <strong>₹{i.price * i.quantity}</strong>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-3 border-t flex justify-between">
        {/* {order.status === OrderStatus.COMPLETED && (
          <button
            onClick={() => modifyOrder(order.id)}
            className="text-xs font-bold text-yellow-600 flex items-center gap-1"
          >
            <Edit2 size={12} /> Modify
          </button>
        )} */}

        {order.status === OrderStatus.COMPLETED && (
          <button
            onClick={() => handleDownload(order)}
            className="text-xs font-bold text-blue-600 flex items-center gap-1"
          >
            <Download size={12} /> Invoice
          </button>
        )}

        {order.status === OrderStatus.COMPLETED && (
          <button
            // onClick={() => {
            //   clearReturnMsg();
            //   setReturnOrder(order.id);
            //   setActiveView("RETURN_FORM");
            // }}
            onClick={() => setShowConfirm(true)}
            className="text-xs font-bold text-red-600 flex items-center gap-1 border border-red-600 px-2 py-1 rounded"
          >
            <AlertOctagon size={12} /> Return Items
          </button>
        )}
      </div>

      {/* <ReturnConfirmModal
  show={showConfirm}
  onCancel={() => setShowConfirm(false)}
  onConfirm={() => {
    setShowConfirm(false);
    clearReturnMsg();
    setReturnOrder(order.id);
    setActiveView("RETURN_FORM");
  }}
/> */}

      <ReturnRequestModal
        show={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={(data) => {
          setShowConfirm(false);
          clearReturnMsg();
          setReturnOrder(order.id);
          setActiveView("RETURN_FORM");
          console.log("RETURN DATA:", data);
        }}
        orderId={order.id}
        deliveryInfo={`${new Date(
          order.createdAt
        ).toLocaleDateString()} • Morning (9am - 2pm)`}
        // ⭐ FIXED HERE
        items={order.items.map((i) => {
          const product = products.find((p: Product) => p.id === i.productId);
          return {
            id: i.id,
            name: i.name,
            quantity: i.quantity,
            price: i.price,
            image: product?.image || "",
          };
        })}
      />
    </div>
  );
}

function handleDownload(order: Order) {
  const blob = new Blob(
    [`Invoice for #${order.id}\nAmount: ₹${order.totalAmount}`],
    { type: "text/plain" }
  );

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Invoice_${order.id}.txt`;
  a.click();
}
