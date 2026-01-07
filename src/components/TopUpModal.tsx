import { CreditCard, X, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useStore } from "../context/store/store";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const TopUpModal: React.FC<Props> = ({ open, onClose }) => {
  const { balance, topUpWallet } = useStore();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handlePreset = (val: number) => setAmount(val.toString());

  const handlePay = () => {
    if (!amount || parseInt(amount) <= 0) return;
    setLoading(true);

    setTimeout(() => {
      topUpWallet(parseInt(amount));
      setLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/40  flex justify-center items-center z-50 px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white  w-full md:max-w-md rounded-t-3xl md:rounded-3xl p-6 animate-slide-up">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Top Up Wallet</h2>
          <button onClick={onClose} className="p-1 bg-gray-100 rounded-full"
>
          <X size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Balance Card */}
        <div className="bg-[#1A3171] rounded-2xl p-6 text-center mb-6">
          <p className="text-blue-200 text-sm">Current Balance</p>
          <h1 className="text-3xl font-bold text-white mt-1">
            ₹{balance.toLocaleString()}
          </h1>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="text-sm text-gray-500">Enter Amount</label>
          <div className="relative mt-2">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">
              ₹
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full border rounded-xl py-3 pl-10 pr-4 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Presets */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[500, 1000, 2000].map((val) => (
            <button
              key={val}
              onClick={() => handlePreset(val)}
              className="py-2 border rounded-xl font-semibold hover:bg-gray-100"
            >
              ₹{val}
            </button>
          ))}
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <CreditCard size={18} /> Proceed to Pay
            </>
          )}
        </button>

        <p className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center gap-1">
          <CheckCircle2 size={12} /> Secured by Nanma Pay
        </p>
      </div>
    </div>
  );
};
