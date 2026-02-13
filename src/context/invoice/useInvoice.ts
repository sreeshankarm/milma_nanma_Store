import { useContext } from "react";
import { InvoiceContext } from "./InvoiceContext";

export const useInvoice = () => {
  const context = useContext(InvoiceContext);

  if (!context) {
    throw new Error("useInvoice must be used inside InvoiceProvider");
  }

  return context;
};
