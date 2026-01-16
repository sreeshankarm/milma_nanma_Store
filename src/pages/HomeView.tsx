import React, { useState, useEffect } from "react";
import { useStore } from "../context/store/store";
import WalletCard from "../components/WalletCard";
import QuickActions from "../components/QuickActions";
import FeedbackBanner from "../components/FeedbackBanner";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard"; // ✅ default import
import SupplyDateCard from "../components/SupplyDateCard";

// import type { Productt } from "../typesss/typesss";
import ProductModal from "../components/ProductModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TopUpModal } from "../components/TopUpModal";
import { useProduct } from "../context/product/useProduct";
import type { Product } from "../types/product";
import { useCart } from "../context/cart/useCart";

export const HomeView: React.FC = () => {
  const {
    balance,
    //  getProducts
  } = useStore();
  const { products, loading, fetchProducts } = useProduct();
  const { addToCart } = useCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [showTopUp, setShowTopUp] = useState(false);
  // ✅ Supply Date State
  // const [supplyDate, setSupplyDate] = useState("2026-01-07");
  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const [supplyDate, setSupplyDate] = useState(getToday());

  const filtered = products.filter((p) =>
    p.prod_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchProducts("2025-12-04");
  // }, []);

  useEffect(() => {
    fetchProducts(supplyDate);
  }, [supplyDate]);

  return (
    <div className="p-4 pb-28 space-y-8 animate-fade-in">
      {/* Wallet / Balance Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WalletCard balance={balance} onTopUp={() => setShowTopUp(true)} />

        <QuickActions
          repeatLastOrder={() => navigate("/cart")}
          goToReturns={() => navigate("/damagesReturn")}
          setActiveView={() => {}}
        />
      </div>
      {/* ================= Feedback & Supply Date ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {/* Feedback Banner */}

        <FeedbackBanner onClick={() => navigate("/feedbackComplaints")} />

        {/* Supply Date */}
        <SupplyDateCard
          value={supplyDate}
          onChange={(date) => setSupplyDate(date)}
        />
      </div>

      {/* Search Bar */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {/* Product Grid */}

      {loading ? (
        <p className="text-center text-gray-500 text-lg font-medium">
          Loading products...
        </p>
      ) : filtered.length === 0 ? (
        <div className="w-full flex justify-center items-center py-20">
          <p className="text-gray-500 text-lg font-medium">No items found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 p-4">
          {filtered.map((p: Product) => (
            <ProductCard
              key={p.prod_code}
              product={p}
              // onAdd={(prod) => console.log("ADD", prod)}
              onAdd={() => {}}
              onClick={() => setSelected(p)}
            />
          ))}
        </div>
      )}

      <TopUpModal open={showTopUp} onClose={() => setShowTopUp(false)} />

      {/* {selected && (
        <ProductModal
          product={selected}
          supplyDate="2025-12-04"
          onClose={() => setSelected(null)}
          onConfirm={async (qty, supplyShift) => {
            try {
              await addToCart(
                "2026-01-01", // supplydate
                supplyShift, // 1 = Morning, 2 = Evening
                selected.prod_code,
                qty
              );

              // toast.success(`🛒 Added to ${qty} item(s) cart`);

              toast.success(
                supplyShift === 1
                  ? `🌅 Morning shift – ${qty} item(s) added`
                  : `🌙 Evening shift – ${qty} item(s) added`
              );
              setSelected(null);
            } catch (err) {
              toast.error("Failed to add to cart");
            }
          }}
        />
      )} */}

      {/* {selected && (
        <ProductModal
          product={{
            prod_code: selected.prod_code,
            prod_name: selected.prod_name,
            final_rate: Number(selected.final_rate), // 🔥 FIX
            imagepath: selected.imagepath,
          }}
          // supplyDate="2025-12-04"
          supplyDate={supplyDate}
          onClose={() => setSelected(null)}
          onConfirm={async (qty, supplyShift,supplyDate) => {
            await addToCart(supplyDate, supplyShift, selected.prod_code, qty);

            toast.success(
              supplyShift === 1
                ? `🌅 Morning shift – ${qty} item(s) added`
                : `🌙 Evening shift – ${qty} item(s) added`
            );
            setSelected(null);
          }}
        />
      )} */}

      {selected && (
        <ProductModal
          product={{
            prod_code: selected.prod_code,
            prod_name: selected.prod_name,
            final_rate: Number(selected.final_rate),
            imagepath: selected.imagepath,
          }}
          supplyDate={supplyDate}
          onClose={() => setSelected(null)}
          onConfirm={async (qty, supplyShift, supplyDate) => {
            try {
              const res = await addToCart(
                supplyDate,
                supplyShift,
                selected.prod_code,
                qty
              );

              /* ❌ BUSINESS ERROR */
              if (res.error) {
                toast.error(res.error, { theme: "colored" });
                return;
              }

              /* ✅ SUCCESS */
              // toast.success(
              //   supplyShift === 1
              //     ? `🌅 Morning shift – ${qty} item(s) added`
              //     : `🌙 Evening shift – ${qty} item(s) added`
              // );

              toast.success(
                supplyShift === 1
                  ? `🌅 Morning shift  ${qty}  ${res.success}`
                  : `🌙 Evening shift  ${qty}  ${res.success}`
              );

              setSelected(null);
            } catch (error) {
              toast.error("Failed to Add cart", { theme: "colored" });
            }
          }}
        />
      )}

      {/* <ToastContainer position="top-right" autoClose={1200} /> */}
    </div>
  );
};

export default HomeView;
