/* ---------- GENERIC API RESPONSE ---------- */
export interface ApiSuccess {
  success: string | number;
}

/* ---------- DATE RANGE ---------- */
export interface DateRangePayload {
  startdate: string;
  enddate: string;
}
