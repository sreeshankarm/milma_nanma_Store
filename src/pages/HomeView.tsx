import React, { useState, useEffect } from "react";
import WalletCard from "../components/WalletCard";
import QuickActions from "../components/QuickActions";
import FeedbackBanner from "../components/FeedbackBanner";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard"; // ✅ default import
import SupplyDateCard from "../components/SupplyDateCard";

import ProductModal from "../components/ProductModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TopUpModal } from "../components/TopUpModal";
import { useProduct } from "../context/product/useProduct";
import type { Product } from "../types/product";
import { useCart } from "../context/cart/useCart";
import { getSettingsApi } from "../api/settings.api";
import { usePayment } from "../context/Payment/usePayment";
import { useAuth } from "../context/auth/useAuth";
import ProductSubGroupFilter from "../components/ProductSubGroupFilter";

export const HomeView: React.FC = () => {
  const { products, loading, fetchProducts, productSubGroups } = useProduct();
  const { balance, fetchBalance } = usePayment();
  const { addToCart } = useCart();
  const { appAccess } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [showTopUp, setShowTopUp] = useState(false);
  const [activeGroup, setActiveGroup] = useState<number | null>(null);

  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const [supplyDate, setSupplyDate] = useState(getToday());

  const normalize = (text: string) => text.toLowerCase().replace(/\s+/g, "");

  const filtered = products.filter((p) => {
    const searchMatch = normalize(p.prod_name).includes(normalize(searchTerm));

    const groupMatch = activeGroup === null || p.subgrp_gid === activeGroup;

    return searchMatch && groupMatch;
  });

  const navigate = useNavigate();
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    fetchBalance(today, today);
  }, []);

  useEffect(() => {
    fetchProducts(supplyDate);
  }, [supplyDate]);

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const format = (date: Date) => date.toLocaleDateString("en-CA"); // YYYY-MM-DD (safe)

    const loadSettings = async () => {
      try {
        const data = await getSettingsApi();
        const days = data?.maxallowedsupplydate ?? 7;

        const today = new Date();
        const max = new Date();
        max.setDate(today.getDate() + (days - 1));

        setMinDate(format(today));
        setMaxDate(format(max));
        setSupplyDate(format(today));
      } catch (error) {
        console.error("Settings API failed:", error);
      }
    };

    loadSettings();
  }, []);

  return (
    <div className="p-4 pb-28 space-y-8 animate-fade-in">
      {/* Wallet / Balance Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WalletCard
          balance={balance}
          onTopUp={() => setShowTopUp(true)}
          allowTopUp={appAccess?.payment === 1}
        />

        <QuickActions
          repeatLastOrder={() => navigate("/cart")}
          goToReturns={() => navigate("/damagesReturn")}
          // setActiveView={() => {}}
        />
      </div>
      {/* ================= Feedback & Supply Date ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {/* Feedback Banner */}

        <FeedbackBanner onClick={() => navigate("/feedbackComplaints")} />

        {/* Supply Date */}

        <SupplyDateCard
          value={supplyDate}
          min={minDate}
          max={maxDate}
          onChange={(date) => setSupplyDate(date)}
        />
      </div>

      {/* Search Bar */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <ProductSubGroupFilter
        groups={productSubGroups}
        active={activeGroup}
        onSelect={setActiveGroup}
      />

      {/* Product Grid */}

      {loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <p className="text-center text-gray-500 text-lg font-medium">
            Loading products...
          </p>
        </div>
      ) : products.length === 0 ? (
        /* 🔥 API failed OR no data returned */
        <div className="w-full flex justify-center items-center py-20">
          <p className="text-gray-500 text-lg font-medium">
            No products available for selected date
          </p>
        </div>
      ) : filtered.length === 0 ? (
        /* 🔎 Search returned no results */
        <div className="w-full flex justify-center items-center py-20">
          <p className="text-gray-500 text-lg font-medium">
            No items match your search
          </p>
        </div>
      ) : (
        /* ✅ Products exist */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 p-4">
          {filtered.map((p: Product) => (
            <ProductCard
              key={p.prod_code}
              product={p}
              // onAdd={() => {}}
              onClick={() => setSelected(p)}
              allowAdd={appAccess?.indent === 1}
            />
          ))}
        </div>
      )}

      <TopUpModal
        open={showTopUp}
        onClose={() => setShowTopUp(false)}
        balance={balance}
      />

      {selected && (
        <ProductModal
          isEdit={false}
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
                qty,
              );

              /* ❌ BUSINESS ERROR */
              if (res.error) {
                toast.error(res.error, { theme: "colored" });
                return;
              }

              /* ✅ SUCCESS */

              // toast.success(
              //   supplyShift === 1
              //     ? `🌅 Morning shift  ${qty}  ${res.success}`
              //     : `🌙 Evening shift  ${qty}  ${res.success}`,
              // );
              toast.success("Product successfully added to cart");

              setSelected(null);
            } catch (error) {
              toast.error("Failed to Add cart", { theme: "colored" });
            }
          }}
        />
      )}
    </div>
  );
};

export default HomeView;
