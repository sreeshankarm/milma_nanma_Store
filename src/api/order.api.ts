import api from "./axios";
import type {
  MyOrdersResponse,
  OrderDetailsResponse,
  ApiSuccess,
  DateRangePayload,
} from "../types";

/* ---------- MY ORDERS ---------- */
export const getMyOrdersApi = (payload: DateRangePayload) =>
  api.post<MyOrdersResponse>("/myorders", payload);

/* ---------- ORDER DETAILS ---------- */
export const getOrderDetailsApi = (payload: { gid: number }) =>
  api.post<OrderDetailsResponse>("/orderdetails", payload);

/* ---------- ADD PRODUCT TO ORDER ---------- */
export const addProductToOrderApi = (payload: {
  indentgid: number;
  productgid: number;
  quantity: number;
  supplydate: string;
  supplyshift: number;
}) =>
  api.post<ApiSuccess>("/addproducttoorder", payload);

/* ---------- UPDATE ORDER DETAIL ---------- */
export const updateOrderDetailApi = (payload: {
  indentdetailgid: number;
  quantity: number;
  supplydate: string;
  supplyshift: number;
}) =>
  api.post<ApiSuccess>("/updateorderdetail", payload);

/* ---------- CANCEL ORDER DETAIL ---------- */
export const cancelOrderDetailApi = (payload: {
  indentdetailgid: number;
}) =>
  api.post<ApiSuccess>("/cancelorderdetail", payload);

/* ---------- CANCEL ENTIRE ORDER ---------- */
export const cancelOrderApi = (payload: {
  indentdetailgid: number;
}) =>
  api.post<ApiSuccess>("/cancelorder", payload);

/* ---------- UPDATE ORDER REMARKS ---------- */
export const updateOrderRemarksApi = (payload: {
  gid: number;
  remarks: string;
}) =>
  api.post<ApiSuccess>("/updateorderremarks", payload);
