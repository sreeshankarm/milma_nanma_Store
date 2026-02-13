/* ---------- GENERIC API RESPONSE ---------- */
export interface ApiSuccess {
  success: string | number;
  error?: string;
}

/* ---------- DATE RANGE ---------- */
export interface DateRangePayload {
  startdate: string;
  enddate: string;
}
