import {
  Clock,
  ChevronDown,
  ChevronUp,
  Download,
  Edit2,
  AlertOctagon,
  Receipt,
  Package,
  Truck,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { OrderStatus, type Order, type Product } from "../../types/types";
import { useStore } from "../../context/store/store";
import ReturnRequestModal from "../ReturnRequestModal";

interface OrderCardProps {
  order: Order;
  expanded: boolean;
  toggleExpand: () => void;
  modifyOrder: (id: string) => void;
  setActiveView: (view: string) => void;
  setReturnOrder: (orderId: string) => void;
  clearReturnMsg: () => void;
}

/* ---------------- STATUS BADGE STYLES ---------------- */
const statusStyle: Record<OrderStatus, string> = {
  [OrderStatus.UPCOMING]: "bg-gray-200 text-gray-700 border-gray-300",
  [OrderStatus.DELIVERED]: "bg-green-100 text-green-700 border-green-200",
  [OrderStatus.COMPLETED]: "bg-green-100 text-green-700 border-green-200",
  [OrderStatus.CANCELLED]: "bg-red-100 text-red-700 border-red-200",
  [OrderStatus.RETURN_REQUESTED]: "bg-amber-100 text-amber-700 border-amber-200",
};

/* ---------------- DETAILED STATUS TIMELINE ---------------- */
const timeline = [
  {
    key: OrderStatus.UPCOMING,
    label: "Pending",
    hint: "Awaiting confirmation",
    icon: Loader2,
  },
  {
    key: OrderStatus.UPCOMING,
    label: "Confirmed",
    hint: "Indent locked in",
    icon: Receipt,
  },
  {
    key: OrderStatus.UPCOMING,
    label: "Processing",
    hint: "Warehouse prepping items",
    icon: Package,
  },
  {
    key: OrderStatus.UPCOMING,
    label: "Loaded",
    hint: "Crates placed in van",
    icon: Truck,
  },
  {
    key: OrderStatus.DELIVERED,
    label: "On the move",
    hint: "Driver en route",
    icon: Truck,
  },
  {
    key: OrderStatus.COMPLETED,
    label: "Delivered",
    hint: "Handed over successfully",
    icon: CheckCircle2,
  },
];

export default function OrderCard({
  order,
  expanded,
  toggleExpand,
  modifyOrder,
  setActiveView,
  setReturnOrder,
  clearReturnMsg,
}: OrderCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { products } = useStore();

  const currentStep =
    order.status === OrderStatus.COMPLETED
      ? timeline.length - 1
      : order.status === OrderStatus.DELIVERED
      ? 4
      : 2;

  const itemTotal = order.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  const estimatedTax = +(itemTotal * 0.05).toFixed(2);
  const adjustment = +(order.totalAmount - itemTotal - estimatedTax).toFixed(2);

  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      {/* HEADER */}
      <div className="flex justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock size={12} />
            {new Date(order.createdAt).toLocaleDateString()} •
            {new Date(order.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <h3 className="text-lg font-bold text-gray-900">#{order.id}</h3>
        </div>

        <div className="text-right space-y-1">
          <span
            className={`inline-block rounded-full border px-3 py-1 text-[11px] font-bold ${statusStyle[order.status]}`}
          >
            {order.status.replace(/_/g, " ")}
          </span>
          <p className="text-2xl font-extrabold text-gray-900">₹{order.totalAmount}</p>
          <p className="text-[11px] text-gray-500">Invoice value</p>
        </div>
      </div>

      {/* EXPAND */}
      <button
        onClick={toggleExpand}
className="mt-3 inline-flex items-center gap-2 rounded-lg border border-[#bfdbfe] bg-[#eff6ff] px-3 py-2 text-xs font-semibold text-[#1d4ed8] hover:bg-[#dbeafe]"
      >
        {expanded ? <>Hide details breakdown <ChevronUp size={14} /></> : <>Open details breakdown<ChevronDown size={14} /></>}
      </button>

      {expanded && (
        <div className="mt-4 space-y-4">
          {/* TIMELINE */}
          <div className="space-y-3 rounded-xl border border-gray-200 bg-[#3f4555] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-200">
              <span>Status timeline</span>
              <span className="text-[11px] text-gray-400">Gray → Yellow → Green</span>
            </div>

            {timeline.map((step, idx) => {
              const isDone = idx < currentStep;
              const isCurrent = idx === currentStep;

              return (
                <div key={idx} className="relative flex gap-3 items-start">
                  {idx !== timeline.length - 1 && (
                    <div
                      className={`absolute left-[15px] top-9 h-8 w-0.5 rounded-full ${
                        isDone ? "bg-green-500" : isCurrent ? "bg-amber-400" : "bg-slate-700"
                      }`}
                    />
                  )}

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                      isDone
                        ? "bg-green-600 border-green-400 text-white"
                        : isCurrent
                        ? "bg-amber-400 border-amber-300 text-black"
                        : "bg-slate-800 border-slate-700 text-slate-400"
                    }`}
                  >
                    <step.icon size={14} />
                  </div>

                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        isDone
                          ? "text-white"
                          : isCurrent
                          ? "text-amber-100"
                          : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p
                      className={`text-[11px] ${
                        isDone
                          ? "text-slate-200"
                          : isCurrent
                          ? "text-amber-100/80"
                          : "text-slate-500"
                      }`}
                    >
                      {step.hint}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ITEMS & CHARGES */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <Receipt size={14} /> Items & charges
            </div>

            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <div>
                  <p className="font-semibold">{idx + 1}. {item.name}</p>
                  <p className="text-[11px] text-gray-500">Qty: {item.quantity} • ₹{item.price} / unit</p>
                </div>
                <span className="font-semibold">₹{item.price * item.quantity}</span>
              </div>
            ))}

            <div className="h-px bg-gray-100" />

            <div className="text-sm space-y-1">
              <div className="flex justify-between"><span>Item total</span><span>₹{itemTotal}</span></div>
              <div className="flex justify-between"><span>Taxes & duties (est.)</span><span>₹{estimatedTax}</span></div>
              <div className={`flex justify-between ${adjustment < 0 ? "text-green-600" : "text-amber-600"}`}>
                <span>{adjustment < 0 ? "Partner discount" : "Logistics & handling"}</span>
                <span>{adjustment < 0 ? "-" : "+"}₹{Math.abs(adjustment)}</span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t"><span>Grand total</span><span>₹{order.totalAmount}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="mt-4 flex justify-between items-center border-t pt-3">
        {order.status === OrderStatus.UPCOMING && (
          <button onClick={() => modifyOrder(order.id)} className="text-xs font-bold text-amber-600 flex items-center gap-1">
            <Edit2 size={12} /> Modify Order
          </button>
        )}

        {order.status === OrderStatus.COMPLETED && (
          <button onClick={() => handleDownload(order)} className="text-xs font-bold text-blue-600 flex items-center gap-1">
            <Download size={12} /> Invoice
          </button>
        )}

        {order.status === OrderStatus.COMPLETED && (
          <button onClick={() => setShowConfirm(true)} className="text-xs font-bold text-red-600 flex items-center gap-1 border border-red-200 px-2 py-1 rounded">
            <AlertOctagon size={12} /> Return Items
          </button>
        )}
      </div>

      <ReturnRequestModal
        show={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          clearReturnMsg();
          setReturnOrder(order.id);
          setActiveView("RETURN_FORM");
        }}
        orderId={order.id}
        deliveryInfo={`${new Date(order.createdAt).toLocaleDateString()} • Morning (9am - 2pm)`}
        items={order.items.map((i) => {
          const product = products.find((p: Product) => p.id === i.productId);
          return { id: i.id, name: i.name, quantity: i.quantity, price: i.price, image: product?.image || "" };
        })}
      />
    </div>
  );
}

function handleDownload(order: Order) {
  const blob = new Blob([`Invoice for #${order.id}\nAmount: ₹${order.totalAmount}`], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Invoice_${order.id}.txt`;
  a.click();
}
