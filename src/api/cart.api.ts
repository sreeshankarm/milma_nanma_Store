import api from "./axios";
import type {
  AddToCartPayload,
  ViewCartResponse,
  ApiSuccess,
} from "../types";

/* ---------- ADD TO CART ---------- */
export const addToCartApi = (payload: AddToCartPayload) =>
  api.post<ApiSuccess>("/addtocart", payload);

/* ---------- GET CART ITEM ---------- */
export const getCartItemApi = (cartid: number) =>
  api.post("/getcart", { cartid });

/* ---------- UPDATE CART ---------- */
export const updateCartApi = (payload: {
  cartid: number;
  supplydate: string;
  productgid: number;
  quantity: number;
  supplyshift: number;
}) =>
  api.post<ApiSuccess>("/updatecart", payload);

/* ---------- DELETE CART ---------- */
export const deleteCartApi = (payload: { cartid: number }) =>
  api.post<ApiSuccess>("/deletecart", payload);

/* ---------- VIEW CART ---------- */
export const viewCartApi = () =>
  api.get<ViewCartResponse>("/viewcart");

/* ---------- PLACE ORDER ---------- */
export const placeOrderApi = () =>
  api.post<ApiSuccess>("/placeorder");
