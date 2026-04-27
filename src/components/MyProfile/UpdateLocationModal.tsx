
import { AlertTriangle, Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  latitude?: number;
  longitude?: number;
  isSaving: boolean;
}

const UpdateLocationModal = ({
  open,
  onClose,
  onSave,
  latitude,
  longitude,
  isSaving,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[90%] max-w-md p-6 space-y-4 shadow-lg">

        <h2 className="text-lg font-semibold">Update Location</h2>

        <div className="text-sm text-gray-600 space-y-1">
          <p>Current Latitude: {latitude}</p>
          <p>Current Longitude: {longitude}</p>
        </div>

        <div className="border border-yellow-400 bg-yellow-50 rounded-lg p-3 flex gap-2 text-sm text-yellow-700">
          <AlertTriangle size={16} />
          Warning : Make sure you are updating the location near your store.
        </div>

        <div className="flex justify-end gap-4 pt-2">
          <button
            onClick={onClose}
            // disabled={isSaving}
            className="text-gray-500 disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            disabled={isSaving}
            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200
            flex items-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              "Save Location"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateLocationModal;