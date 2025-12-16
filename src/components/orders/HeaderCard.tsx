import { AlertOctagon } from "lucide-react";

// Define the props interface
interface HeaderCardProps {
  returnIntentMessage: string | null; // or undefined if it can be undefined
  clearReturn: () => void;
  openReturns: () => void;
}

export default function HeaderCard({
  returnIntentMessage,
  clearReturn,
  openReturns,
}: HeaderCardProps) {
  return (
    <>
      <div className="flex items-center justify-between bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 shadow-sm">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-gray-500">
            My orders
          </p>
          <h2 className="text-xl font-bold">Upcoming drops & history</h2>
          <p className="text-xs text-gray-500">
            Track progress & revisit past indents.
          </p>
        </div>

        <button
          onClick={openReturns}
          className="text-xs bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl flex items-center gap-2 text-amber-700 font-semibold"
        >
          <AlertOctagon size={14} /> Return history
        </button>
      </div>

      {returnIntentMessage && (
        <div className="p-3 border border-amber-200 bg-amber-50 rounded-xl flex items-start gap-3">
          <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
            <AlertOctagon size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Select the right order</p>
            <p className="text-xs">
              Pick the correct order then tap “Return Items”.
            </p>
          </div>
          <button onClick={clearReturn} className="text-xs font-semibold">
            Got it
          </button>
        </div>
      )}
    </>
  );
}
