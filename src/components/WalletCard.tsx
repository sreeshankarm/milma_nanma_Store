import { Wallet, ChevronRight } from "lucide-react";

interface Props {
  balance: number;
  onTopUp: () => void;
}

export default function WalletCard({ balance, onTopUp }: Props) {
  return (
    <div
      onClick={onTopUp}
      className="bg-linear-to-r from-[#1A3171] to-[#1A3171] p-6 rounded-3xl shadow-xl relative overflow-hidden cursor-pointer group"
    >
      {/* Background Circle */}
      <div className="-right-5 -top-5 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl absolute"></div>

      <div className="relative z-10">
        {/* Top Row: Icon & Percentage */}
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
            <Wallet className="text-white" size={24} />
          </div>
          <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
            +4.2%
          </span>
        </div>

        {/* Balance Label */}
        <p className="text-blue-200 text-sm">Available Credit</p>

        {/* Balance Amount */}
        <h2
          className={`text-4xl font-bold my-3 ${
            balance < 0 ? "text-red-300" : "text-white"
          }`}
        >
          ₹{balance.toLocaleString()}
        </h2>

        {/* Tap to Top Up */}
        <div className="flex items-center gap-2 text-xs text-blue-300 transition-transform group-hover:translate-x-2">
          Tap to Top Up <ChevronRight size={12} />
        </div>
      </div>
    </div>
  );
}
