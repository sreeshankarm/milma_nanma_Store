import { AlertTriangle } from "lucide-react";

interface ReturnConfirmModalProps {
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ReturnConfirmModal({
  show,
  onCancel,
  onConfirm,
}: ReturnConfirmModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 shadow-xl space-y-4 animate-scaleIn">

        <div className="flex items-center gap-2 text-red-600">
          <AlertTriangle size={22} />
          <h3 className="text-lg font-bold">Confirm Return</h3>
        </div>

        <p className="text-sm text-gray-600">
          Are you sure you want to proceed with the return request?
        </p>

        <div className="flex gap-2 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg border text-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-lg bg-red-600 text-white"
          >
            Yes, Continue
          </button>
        </div>

      </div>
    </div>
  );
}
