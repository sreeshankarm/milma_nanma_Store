// export interface TokenResponse {
//   access_token: string;
//   // refresh_token: string;
//   environment: string;
// }

// export const token = {
//   getAccess: (): string | null =>
//     localStorage.getItem("access_token"),

//   set: (data: TokenResponse) => {
//     localStorage.setItem("access_token", data.access_token);
//     // localStorage.setItem("refresh_token", data.refresh_token);
//     localStorage.setItem("environment", data.environment);
//   },

//   clear: () => localStorage.clear(),
// };









// import Cookies from "js-cookie";

// export interface TokenResponse {
//   access_token: string;
//   refresh_token?: string;
//   environment: string;
// }

// const COOKIE_OPTIONS: Cookies.CookieAttributes = {
//   expires: 7,          // default 7 days
//   secure: true,        // only HTTPS
//   sameSite: "Strict",  // CSRF protection
//     path: "/",
// };

// export const token = {
//   /* ---------- GETTERS ---------- */
//   getAccess(): string | undefined {
//     return Cookies.get("access_token");
//   },

//   getRefresh(): string | undefined {
//     return Cookies.get("refresh_token");
//   },

//   getEnvironment(): string | undefined {
//     return Cookies.get("environment");
//   },

//   /* ---------- SET TOKENS ---------- */
//   set(data: TokenResponse): void {
//     Cookies.set("access_token", data.access_token, COOKIE_OPTIONS);

//     if (data.refresh_token) {
//       Cookies.set("refresh_token", data.refresh_token, {
//         ...COOKIE_OPTIONS,
//         expires: 30, // refresh token longer expiry
//       });
//     }

//     Cookies.set("environment", data.environment, COOKIE_OPTIONS);
//   },

//   /* ---------- CLEAR TOKENS ---------- */
//   clear(): void {
//     Cookies.remove("access_token");
//     Cookies.remove("refresh_token");
//     Cookies.remove("environment");
//   },
// };









import Cookies from "js-cookie";

export interface TokenResponse {
  token_type?: string;
  expires_in?: number;
  access_token: string;
  refresh_token?: string;
  environment: string;
}

const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";
const ENV_KEY = "environment";

const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  expires: 7, // days
  secure: true,
  sameSite: "Strict",
  path: "/",
};

export const token = {
  getAccess(): string | undefined {
    // Try cookies first, fallback to localStorage for Vercel compatibility
    const fromCookie = Cookies.get(ACCESS_KEY);
    if (fromCookie) return fromCookie;
    
    if (typeof window !== "undefined") {
      return localStorage.getItem(ACCESS_KEY) || undefined;
    }
    return undefined;
  },

  getRefresh(): string | undefined {
    // Try cookies first, fallback to localStorage
    const fromCookie = Cookies.get(REFRESH_KEY);
    if (fromCookie) return fromCookie;
    
    if (typeof window !== "undefined") {
      return localStorage.getItem(REFRESH_KEY) || undefined;
    }
    return undefined;
  },

  getEnvironment(): string | undefined {
    // Try cookies first, fallback to localStorage
    const fromCookie = Cookies.get(ENV_KEY);
    if (fromCookie) return fromCookie;
    
    if (typeof window !== "undefined") {
      return localStorage.getItem(ENV_KEY) || undefined;
    }
    return undefined;
  },

  set(data: TokenResponse) {
    // Store in both cookies AND localStorage for maximum compatibility
    Cookies.set(ACCESS_KEY, data.access_token, COOKIE_OPTIONS);
    if (typeof window !== "undefined") {
      localStorage.setItem(ACCESS_KEY, data.access_token);
    }

    if (data.refresh_token) {
      Cookies.set(REFRESH_KEY, data.refresh_token, {
        ...COOKIE_OPTIONS,
        expires: 30, // refresh token longer
      });
      if (typeof window !== "undefined") {
        localStorage.setItem(REFRESH_KEY, data.refresh_token);
      }
    }

    Cookies.set(ENV_KEY, data.environment, COOKIE_OPTIONS);
    if (typeof window !== "undefined") {
      localStorage.setItem(ENV_KEY, data.environment);
    }
  },

  clear() {
    Cookies.remove(ACCESS_KEY);
    Cookies.remove(REFRESH_KEY);
    Cookies.remove(ENV_KEY);
    
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem(ENV_KEY);
    }
  },
};