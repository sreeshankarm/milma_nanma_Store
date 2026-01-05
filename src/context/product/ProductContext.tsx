import { createContext } from "react";
import type { Product } from "../../types/product";

export interface ProductContextType {
  products: Product[];
  loading: boolean;
  fetchProducts: (date: string) => Promise<void>;
}

export const ProductContext =
  createContext<ProductContextType | null>(null);
