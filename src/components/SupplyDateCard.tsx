
import React from "react";

interface SupplyDateCardProps {
  value: string;
  onChange: (date: string) => void;
}

const SupplyDateCard: React.FC<SupplyDateCardProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="bg-blue-600/10 border border-blue-600/20 dark:border-blue-400/20 rounded-2xl px-6 py-5  w-full">
      <div className="flex items-center justify-between gap-6">
        {/* Left: Label */}
        <div className="flex flex-col">
          <span className="text-xs opacity-70 uppercase tracking-wide ">
            Order Settings
          </span>
          <label className="ttext-sm font-semibold">
            Supply Date
          </label>
        </div>

        {/* Right: Date Input */}
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-48
            rounded-lg
            px-4 py-2.5
            text-sm
            font-medium
            text-gray-700
            bg-white
            border border-transparent
            focus:outline-none
            focus:ring-2
            focus:ring-white/80
            transition
          "
        />
      </div>
    </div>
  );
};

export default SupplyDateCard;
