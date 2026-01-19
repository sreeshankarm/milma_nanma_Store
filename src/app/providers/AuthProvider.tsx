import { useEffect, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { loginApi } from "../../api/auth.api";
import { getUserApi } from "../../api/user.api";
import { token } from "../../utils/token";
import Loader from "../../components/Loader";
import type { LoginPayload } from "../../types";
import { toast } from "react-toastify";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(!!token.getAccess());
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* ---------- LOAD USER ON REFRESH ---------- */
  useEffect(() => {
    const initAuth = async () => {
      if (!token.getAccess()) {
        setLoading(false);
        return;
      }

      try {
        const res = await getUserApi();

        // updatecode handling
        // if (res.data.updatecode === 3) {
        //   token.clear();
        //   window.location.href = "/update-required";
        //   return;
        // }

        setUserName(res.data.user.user_name);
        setIsAuth(true);
      } catch (err: any) {
        toast.error(err?.message || "Invalid credentials", {
          theme: "colored",
        });

        // token.clear();
        // setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /* ---------- LOGIN ---------- */
  // const login = async (mobile: string, password: string) => {
  //   const payload: LoginPayload = {
  //     login_mobile: mobile,
  //     password,
  //   };

  //   const { data } = await loginApi(payload);
  //   token.set(data);

  //   const userRes = await getUserApi();
  //   setUserName(userRes.data.user.user_name);
  //   setIsAuth(true);
  // };

  const login = async (mobile: string, password: string) => {
    try {
      const payload: LoginPayload = {
        login_mobile: mobile,
        password,
      };

      const { data } = await loginApi(payload);
      token.set(data);

      const userRes = await getUserApi();
      setUserName(userRes.data.user.user_name);
      setIsAuth(true);

      toast.success("Login successful");
    } catch (err: any) {
      toast.error(err?.message || "Invalid mobile or password", {
        theme: "colored",
      });
      throw err; // important if caller handles loading
    }
  };

  /* ---------- LOGOUT ---------- */
  const logout = () => {
    token.clear();
    setIsAuth(false);
    setUserName(null);
  };

  if (loading) return <Loader />;

  return (
    <AuthContext.Provider value={{ isAuth, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
