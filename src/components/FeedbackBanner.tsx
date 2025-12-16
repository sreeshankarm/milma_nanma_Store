import { AlertCircle } from "lucide-react";

export default function FeedbackBanner({ onClick }: { onClick: () => void }) {
  return (
    <div className="bg-red-500/10 border border-red-500/20 dark:border-red-400/20 rounded-2xl p-4 flex items-center gap-3">
      <div className="p-2 bg-red-500/20 rounded-xl text-red-300">
        <AlertCircle size={20} />
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold">Submit complaints or feedback</p>
        <p className="text-xs opacity-70">
          Raise product, logistics or quality issues and view replies.
        </p>
      </div>

      <button
        onClick={onClick}
        className="px-3 py-2 bg-[#8e2d26] text-white rounded-lg text-xs font-semibold"
      >
        Open
      </button>
    </div>
  );
}
