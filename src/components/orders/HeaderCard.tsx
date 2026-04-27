import { AlertOctagon } from "lucide-react";

// Define the props interface
interface HeaderCardProps {
  openReturns: () => void;
}

export default function HeaderCard({
  openReturns,
}: HeaderCardProps) {
  return (
    <>
      <div className="flex items-center justify-between bg-white  border border-gray-200  rounded-2xl p-4 shadow-sm">
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
          className="text-xs bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl flex items-center gap-2 text-amber-700 font-semibold cursor-pointer"
        >
          <AlertOctagon size={14} /> Return history
        </button>
      </div>
    </>
  );
}
