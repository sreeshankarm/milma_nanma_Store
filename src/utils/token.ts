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

export const token = {
  getAccess(): string | null {
    return localStorage.getItem(ACCESS_KEY);
  },

  getRefresh(): string | null {
    return localStorage.getItem(REFRESH_KEY);
  },

  getEnvironment(): string | null {
    return localStorage.getItem(ENV_KEY);
  },

  set(data: TokenResponse) {
    localStorage.setItem(ACCESS_KEY, data.access_token);

    if (data.refresh_token) {
      localStorage.setItem(REFRESH_KEY, data.refresh_token);
    }

    localStorage.setItem(ENV_KEY, data.environment);
  },

  clear() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(ENV_KEY);
  },
};
