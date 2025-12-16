import React, { useState } from "react";
import { useStore } from "../context/store/store";
import WalletCard from "../components/WalletCard";
import QuickActions from "../components/QuickActions";
import FeedbackBanner from "../components/FeedbackBanner";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard"; // ✅ default import
import type { Product } from "../types/types";
import ProductModal from "../components/ProductModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const HomeView: React.FC = () => {
  const { balance, getProducts, addToCart } = useStore(); // remove undefined props
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = getProducts().filter((p: Product) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const navigate = useNavigate();

  return (
    <div className="p-4 pb-28 space-y-8 animate-fade-in">
      {/* Wallet / Balance Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WalletCard
          balance={balance}
          onTopUp={() => {
            /* handle top-up */
          }}
        />

        <QuickActions
         repeatLastOrder={() => navigate("/cart")}
         goToReturns={() => navigate("/DamagesReturn")}
          setActiveView={() => {}}
        />
      </div>

      {/* Complaint & Feedback Banner */}
      <FeedbackBanner onClick={() => {}} />

      {/* Search Bar */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="w-full flex justify-center items-center py-20">
          <p className="text-gray-500 text-lg font-medium">No items found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 p-4">
          {filtered.map((p: Product) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={addToCart}
              onClick={() => setSelected(p)}
            />
          ))}
        </div>
      )}

      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
          // onConfirm={(qty) => {
          //   for (let i = 0; i < qty; i++) addToCart(selected);
          //   setSelected(null);
          // }}
          onConfirm={(qty) => {
            addToCart(selected, qty); // 👈 correct
            toast.success(`🛒 Added ${qty} item(s) to cart`, {
              hideProgressBar: true,
            });
            setSelected(null);

            // navigate("/cart");
          }}
        />
      )}
      <ToastContainer position="top-right" autoClose={1200} />
    </div>
  );
};

export default HomeView;
