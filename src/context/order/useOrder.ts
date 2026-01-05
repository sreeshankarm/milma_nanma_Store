import { useContext } from "react";
import { OrderContext } from "./OrderContext";

export const useOrder = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error("useOrder must be used inside OrderProvider");
  }
  return ctx;
};
