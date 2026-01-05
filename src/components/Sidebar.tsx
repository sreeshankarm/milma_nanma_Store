import {
  Home,
  User,
  Wallet,
  ShoppingBag,
  ShoppingCart,
  PackageSearch,
  BarChart3,
  RotateCw,
  Gift,
  MessageCircle,
  Users,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
import { useProfile } from "../context/profile/useProfile";
import  { useEffect } from "react";


interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: Props) {
  const location = useLocation();
    const { userName } = useAuth();
    const { profile,fetchProfile } = useProfile();

      useEffect(() => {
        fetchProfile();
      }, []);

  const menu = [
    { icon: <Home size={18} />, label: "Home", path: "/" },
    { icon: <User size={18} />, label: "My Profile", path: "/profile" },
    { icon: <Wallet size={18} />, label: "My Wallet", path: "/wallet" },
    { icon: <ShoppingBag size={18} />, label: "My Orders", path: "/orders" },
    { icon: <ShoppingCart size={18} />, label: "Cart", path: "/cart" },
    {
      icon: <PackageSearch size={18} />,
      label: "Order Tracking",
      path: "/orderTracking",
    },
    {
      icon: <BarChart3 size={18} />,
      label: "Sales Trend",
      path: "/salesTrend",
    },
    {
      icon: <RotateCw size={18} />,
      label: "Damages & Return",
      path: "/damagesReturn",
    },
    {
      icon: <Gift size={18} />,
      label: "Commission Rewards",
      path: "/CommissionRewards",
    },
    {
      icon: <MessageCircle size={18} />,
      label: "Feedback & Complaints",
      path: "/feedbackComplaints",
    },
    {
      icon: <Users size={18} />,
      label: "My distributors",
      path: "/mydistributors",
    },
  ];

  return (
    <>
      {/* Background overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 w-72 h-full bg-white z-50 shadow-xl 
         transform transition-transform duration-300 flex flex-col
          ${open ? "translate-x-0" : "-translate-x-72"}`}
      >
        {/* Header */}

        <div className="p-4 border-b flex justify-between items-start">
          {/* Profile Section */}
          <div>
            {/* <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500"> Profile </p> */}

            <img
              src="/nanma.png"
              alt="nanma"
              className="w-18 h-18 object-cover rounded-full"
            />
            <p className="text-xl font-bold mt-2">Namma Store</p>
            <p className="text-sm text-gray-600">Agent • {userName}</p>
            <p className="text-sm text-gray-600 mt-1">{profile?.login_mobile}</p>
            <p className="text-xs text-gray-500">{profile?.state_name}</p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200 transition"
          >
            <X size={22} className="text-gray-700" />
          </button>
        </div>

        {/* Menu List */}
        <nav className="p-3 space-y-2 overflow-y-auto flex-1 sidebar-scroll">
          {menu.map((item, idx) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                to={item.path}
                key={idx}
                onClick={onClose}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border 
            border-gray-200 
            ${isActive ? "bg-[#eff6ff]" : "text-gray-700"}
            hover:bg-[#eff6ff]`}
              >
                <span className={isActive ? "text-[#2563eb]" : "text-gray-600"}>
                  {item.icon}
                </span>

                <span
                  className={`text-sm font-medium ${
                    isActive ? "text-[#2563eb]" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 text-center text-xs text-gray-500 border-t">
          Need help? Contact support@milma.coop
        </div>
      </aside>
    </>
  );
}
