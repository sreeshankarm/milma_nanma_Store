/* ---------- USER ---------- */
export interface User {
  id: number;
  user_name: string;
}

/* ---------- USER API RESPONSE ---------- */
export interface UserResponse {
  dbillmasteruser: number;
  updatecode: 1 | 2 | 3;
  message?: string;
  features?: string[];
  appaccess?: {
    use: number;
    view: number;
    indent: number;
    payment: number;
  };
  user: User;
}
