import { createContext } from "react";
import type { Product,ProductSubGroup  } from "../../types/product";

export interface ProductContextType {
  products: Product[];
  loading: boolean;
  fetchProducts: (date: string) => Promise<void>;
    productSubGroups: ProductSubGroup[];
}

export const ProductContext =
  createContext<ProductContextType | null>(null);
