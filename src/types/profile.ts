/* ---------- PROFILE ---------- */
export interface UserProfile {
  id: number;
  agent_code?: number;
  agent_name: string;
  login_mobile: string;
  lgin_email?: string;
  credit_limit: string;
  gst_status?: string;
  state_name: string;
}
export interface ContactDetailsFormState {
  phone: string;
  email: string;
  address: string;
  storePhotos: string[];
}
