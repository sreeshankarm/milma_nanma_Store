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









import Cookies from "js-cookie";

export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  environment: string;
}

const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  expires: 7,          // default 7 days
  secure: true,        // only HTTPS
  sameSite: "Strict",  // CSRF protection
};

export const token = {
  /* ---------- GETTERS ---------- */
  getAccess(): string | undefined {
    return Cookies.get("access_token");
  },

  getRefresh(): string | undefined {
    return Cookies.get("refresh_token");
  },

  getEnvironment(): string | undefined {
    return Cookies.get("environment");
  },

  /* ---------- SET TOKENS ---------- */
  set(data: TokenResponse): void {
    Cookies.set("access_token", data.access_token, COOKIE_OPTIONS);

    if (data.refresh_token) {
      Cookies.set("refresh_token", data.refresh_token, {
        ...COOKIE_OPTIONS,
        expires: 30, // refresh token longer expiry
      });
    }

    Cookies.set("environment", data.environment, COOKIE_OPTIONS);
  },

  /* ---------- CLEAR TOKENS ---------- */
  clear(): void {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("environment");
  },
};