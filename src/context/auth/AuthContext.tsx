import { createContext } from "react";

export interface AppAccess {
  use: number;
  view: number;
  indent: number;
  payment: number;
}

export interface AuthContextType {
  isAuth: boolean;
  userName: string | null;
  login: (mobile: string, password: string) => Promise<void>;
  // logout: () => void;
  logout: () => Promise<void>; // 👈 async now
  appAccess: AppAccess | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);
