import { useState } from "react";
import {
  addToCartApi,
  viewCartApi,
  deleteCartApi,
  updateCartApi,
  placeOrderApi
} from "../../api/cart.api";
// import type { ViewCartResponse } from "../../types";
import { CartContext } from "../../context/cart/CartContext";
import type { CartItem } from "../../types/cart";
import { normalizeCart } from "../../utils/cartNormalizer";
import { toast } from "react-toastify";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // const [cart, setCart] = useState<ViewCartResponse["output"] | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const [loading, setLoading] = useState(false);

  // const loadCart = async () => {
  //   setLoading(true);
  //   const { data } = await viewCartApi();
  //   setCart(data.output);
  //   setLoading(false);
  // };

  const loadCart = async () => {
    setLoading(true);

    const { data } = await viewCartApi();

    if (!data?.output || Object.keys(data.output).length === 0) {
      // 🔥 when cart empty
      setCart([]);
      setLoading(false);
      return;
    }

    const normalized = normalizeCart(data.output);
    setCart(normalized);
    setLoading(false);
  };

  const addToCart = async (
    supplydate: string,
    supplyshift: number,
    productcode: number,
    quantity: number
  ) => {
    await addToCartApi({
      supplydate,
      supplyshift,
      productcode,
      quantity,
    });
    await loadCart();
  };

  const removeFromCart = async (cartid: number) => {
    try {
      setLoading(true);

      await deleteCartApi({ cartid });

      // ✅ SUCCESS TOAST
      toast.success("Item removed from cart");

      await loadCart(); // 🔥 refresh UI immediately
    } catch (error) {
      // ❌ ERROR TOAST
      toast.error("Failed to remove item");
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = async (item: CartItem) => {
    await updateCartApi({
      cartid: item.cartid,
      productgid: 0, // backend ignore or keep 0
      quantity: item.quantity + 1,
      supplydate: "", // backend already has it
      supplyshift: 0,
    });

    await loadCart();
  };

  const decreaseQty = async (item: CartItem) => {
    if (item.quantity <= 1) {
      await removeFromCart(item.cartid);
      return;
    }

    await updateCartApi({
      cartid: item.cartid,
      productgid: 0,
      quantity: item.quantity - 1,
      supplydate: "",
      supplyshift: 0,
    });

    await loadCart();
  };


  const placeOrder = async () => {
  try {
    setLoading(true);

    await placeOrderApi(); // 🔥 API CALL

    toast.success("Order placed successfully");

    setCart([]); // ✅ clear cart UI
  } catch (error) {
    toast.error("Failed to place order");
    throw error;
  } finally {
    setLoading(false);
  }
};


  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        loadCart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        placeOrder,
       
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
