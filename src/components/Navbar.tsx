import { Menu, Bell,  ShoppingCart, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";

interface Props {
  onMenuClick: () => void;
  cartCount?: number;
}

export default function Navbar({ onMenuClick, cartCount = 0 }: Props) {
  const navigate = useNavigate(); // 🔥 init navigate

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/signin", { replace: true });
  // };

  const { logout,userName  } = useAuth(); // ✅ use context

  const handleLogout = () => {
    logout(); // ✅ clears tokens + updates isAuth
    navigate("/signin", { replace: true });
  };

  return (
    <nav className=" sticky top-0 z-20 w-full h-20 bg-[#8e2d26] shadow flex items-center px-4">
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 shadow-sm cursor-pointer hover:bg-gray-200 transition"
      >
        <Menu size={16} />
      </button>

      <img
        src="/nanma.png"
        alt="nanma"
        className="w-12 h-12 object-cover ml-6"
      />

      <div className="leading-tight  text-white ml-2">
        <p className="text-[11px] uppercase tracking-[0.2em]">Milma Partner</p>
        <p className="text-sm font-bold">Nanma Store</p>
        <p className="text-[11px]">Agent • {userName}</p>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <div className="relative">
          <button
            aria-label="Cart"
            className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 cursor-pointer hover:bg-gray-200 transition"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart size={20} />
          </button>

          {/* 🔴 Notification Badge */}
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>

        <button
          aria-label="Notifications"
          className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 cursor-pointer hover:bg-gray-200 transition"
        >
          <Bell size={18} />
        </button>

        {/* <button
          aria-label="Toggle theme"
          className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 cursor-pointer hover:bg-gray-200 transition"
        >
          <Sun size={18} />
        </button> */}

        <div className="relative group">
          <button
            onClick={handleLogout}
            aria-label="Logout"
            className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 cursor-pointer hover:bg-gray-200 transition"
          >
            <LogOut size={18} />
          </button>

          {/* Tooltip */}
          <span className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-md bg-black px-2 py-1 text-[10px] text-white opacity-0 transition group-hover:opacity-100">
            Logout
          </span>
        </div>
      </div>
    </nav>
  );
}
