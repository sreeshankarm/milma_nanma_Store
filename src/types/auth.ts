/* ---------- LOGIN ---------- */
export interface LoginPayload {
  login_mobile: string;
  password: string;
}

/* ---------- LOGIN RESPONSE ---------- */
export interface LoginResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token?: string;
  environment: string; // 1 | 2 | 3 | 4
}



export interface ChangePasswordPayload {
  existingpassword: string;
  password: string;
  password_confirmation: string;
}
