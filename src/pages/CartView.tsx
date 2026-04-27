import { useState, useEffect } from "react";
import { ChevronRight, ShoppingCart } from "lucide-react";
import CartList from "../components/CartList";

import { useCart } from "../context/cart/useCart";
import type { CartItem } from "../types/cart";
import ProductModal from "../components/ProductModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { usePayment } from "../context/Payment/usePayment";
import { useAuth } from "../context/auth/useAuth";

export default function CartView() {
  const {
    cart,
    loadCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    placeOrder,
    updateCart,
    // loading,
    cartLoading,
    removingId,
  } = useCart();

  const { balance, fetchBalance } = usePayment();
  const { appAccess } = useAuth();
  const [editItem, setEditItem] = useState<CartItem | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    fetchBalance(today, today);
  }, []);

  const total = cart.reduce(
    (sum: number, item: CartItem) =>
      sum + Number(item.rate) * Number(item.quantity),
    0,
  );

  // Proper rounding to 2 decimals
  const formattedTotal = Number(total.toFixed(2));

  /* ---------- CONFIRM ---------- */

  // const handleConfirm = async () => {
  //   if (cart.length === 0) {
  //     toast.error("Cart is empty");
  //     return;
  //   }

  //   // ❌ Check wallet balance
  //   // if (balance < formattedTotal) {
  //   //   toast.error("Insufficient wallet balance");
  //   //   return;
  //   // }

  //   try {
  //     setConfirmLoading(true);
  //     await placeOrder(); // 🔥 toast handled inside provider
  //     navigate("/orders");
  //   } finally {
  //     setConfirmLoading(false);
  //   }
  // };

  const handleConfirm = async () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    // ❌ Check wallet balance
    // if (balance < formattedTotal) {
    //   toast.error("Insufficient wallet balance");
    //   return;
    // }

    try {
      setConfirmLoading(true);

      const res = await placeOrder();

      /* ❌ STOP if error */
      if (res?.error) return;

      /* ✅ ONLY SUCCESS NAVIGATION */
      navigate("/orders");
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {/* ------------------ LOADING UI ------------------ */}
      {cartLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-10 w-10 border-4 border-[#8e2d26] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading cart...</p>
        </div>
      )}

      {/* ------------------ EMPTY CART UI ------------------ */}
      {!cartLoading && cart.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShoppingCart size={60} className="text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg font-medium">Empty Cart</p>
        </div>
      )}

      {!cartLoading && cart.length > 0 && (
        <>
          {/* Cart Items */}
          <CartList
            items={cart}
            onIncrease={(item) => increaseQty(item)}
            onDecrease={(item) => decreaseQty(item)}
            onRemove={(id) => removeFromCart(id)}
            onEdit={(item) => setEditItem(item)}
            removingId={removingId}
            canEdit={appAccess?.indent === 1}
          />

          {/* 🟠 EDIT MODAL */}

          {editItem && (
            <ProductModal
              isEdit={true}
              product={{
                prod_code: editItem.prod_code,
                prod_name: editItem.prod_name,
                final_rate: Number(editItem.final_rate),
                imagepath: editItem.imagepath,
              }}
              supplyDate={editItem.supplydate}
              initialQty={editItem.quantity}
              initialShift={editItem.supplyshift}
              onClose={() => setEditItem(null)}
              onConfirm={async (qty, supplyShift, newDate) => {
                if (!editItem.productgid) {
                  toast.error("Invalid product. Please refresh cart.");
                  return;
                }

                try {
                  const res = await updateCart(
                    editItem.cartid,
                    editItem.productgid,
                    qty,
                    newDate,
                    supplyShift,
                  );

                  /* ❌ BUSINESS ERROR */
                  if (res.error) {
                    toast.error(res.error, { theme: "colored" });
                    return;
                  }

                  /* ✅ SUCCESS */

                  toast.success(`Cart updated: ${res.success}`);

                  setEditItem(null);
                } catch {
                  toast.error("Failed to update cart", { theme: "colored" });
                }
              }}
            />
          )}

          {/* Totals */}
          <div className="bg-white border border-gray-200  shadow p-4 space-y-2 mt-6">
            <div className="flex justify-between text-gray-600">
              <span>Item Total</span>
              {/* <span>₹{total}</span> */}
              <span>
                {/* ₹{total} */}₹
                {formattedTotal.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Wallet Balance</span>
              {/* <span>₹{balance}</span> */}
              <span>
                ₹
                {balance.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="border-t pt-2">
              <div className="flex justify-between font-semibold text-lg">
                <span>Grand Total</span>
                <span>
                  {/* ₹{total} */}₹
                  {formattedTotal.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <p className="text-green-600 text-sm mt-1">
                {/* You will have ₹{total} left after deduction */}
                You will have ₹
                {formattedTotal.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                left after deduction
              </p>
            </div>
          </div>
          {appAccess?.indent === 1 && (
            <button
              onClick={handleConfirm}
              disabled={confirmLoading}
              className={`w-full bg-[#8e2d26] text-white py-3  text-lg font-semibold
    flex items-center justify-center gap-2 transition cursor-pointer
    ${confirmLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#b91c1c]"}
  `}
            >
              {confirmLoading && (
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}

              <span>
                {confirmLoading ? "Placing Order..." : "Submit Order"}
              </span>

              {!confirmLoading && <ChevronRight size={20} />}
            </button>
          )}
        </>
      )}
    </div>
  );
}
