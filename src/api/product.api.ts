import api from "./axios";
import type {
  ProductListResponse,
  ProductDetailsResponse,
} from "../types";

/* ---------- PRODUCT LIST ---------- */
export const getProductsApi = (supplydate: string) =>
  api.post<ProductListResponse>("/products", { supplydate });

/* ---------- PRODUCT DETAILS ---------- */
export const getProductDetailsApi = (
  supplydate: string,
  productcode: number
) =>
  api.post<ProductDetailsResponse>("/product/details", {
    supplydate,
    productcode,
  });
