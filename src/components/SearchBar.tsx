import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative group">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search items..."
        className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-10 shadow-sm
 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none"
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
