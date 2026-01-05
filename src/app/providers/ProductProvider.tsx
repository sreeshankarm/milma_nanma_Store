// import { createContext, useContext, useState } from "react";
import { useState } from "react";

import { getProductsApi } from "../../api/product.api";
import { ProductContext } from "../../context/product/ProductContext";
import type { Product } from "../../types/product";

// interface ProductContextType {
//   products: Product[];
//   loading: boolean;
//   fetchProducts: (date: string) => Promise<void>;
// }

// export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (date: string) => {
    setLoading(true);
    const { data } = await getProductsApi(date);
    setProducts(data.proddefaultratetypedata);
    setLoading(false);
  };

  return (
    <ProductContext.Provider value={{ products, loading, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

/* ✅ EXPORT HOOK FROM SAME FILE */
// export const useProduct = () => {
//   const ctx = useContext(ProductContext);
//   if (!ctx) {
//     throw new Error("useProduct must be used inside ProductProvider");
//   }
//   return ctx;
// };
