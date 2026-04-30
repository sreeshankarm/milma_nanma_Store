import { useState, useEffect } from "react";
import { Pencil, CheckCircle2, Loader2 } from "lucide-react";
import { updateOrderRemarksApi } from "../../api/order.api";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth/useAuth";
interface Props {
  gid: number;
  initialRemarks: string | null;
  onUpdated?: () => void;
  invoiceStatus?: string;
}

const OrderRemarks: React.FC<Props> = ({
  gid,
  initialRemarks,
  onUpdated,
  invoiceStatus,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [originalRemarks, setOriginalRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const { appAccess } = useAuth();
  // 🔄 Sync state when prop changes (important after refresh)
  useEffect(() => {
    const value = initialRemarks?.trim() || "";
    setRemarks(value);
    setOriginalRemarks(value);
  }, [initialRemarks]);

  // ✅ Enable button only if changed
  const isChanged = remarks.trim() !== originalRemarks;

  const handleUpdate = async () => {
    const trimmed = remarks.trim();
    // if (!trimmed) return toast.error("Remarks required");

    try {
      setLoading(true);

      const { data } = await updateOrderRemarksApi({
        gid,
        remarks: trimmed,
      });

      if (!data?.success) {
        return toast.error(data?.error || "Unable to update remarks");
      }

      toast.success(
        typeof data.success === "string"
          ? data.success
          : "Remarks updated successfully",
      );

      setOriginalRemarks(trimmed);
      setIsEdit(false);
      onUpdated?.();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Failed to update remarks",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-700">Order Remarks</h3>

        {!isEdit && invoiceStatus !== "success" && appAccess?.indent === 1 && (
          <button
            onClick={() => setIsEdit(true)}
            className="flex items-center gap-2
               px-3 py-1.5
               text-sm font-medium
               text-emerald-600
               border border-emerald-200
               rounded-lg
               hover:bg-emerald-50
               active:scale-95
               transition-all duration-200 cursor-pointer"
          >
            <Pencil size={16} />
            Edit
          </button>
        )}
      </div>

      {/* View Mode */}
      {!isEdit && (
        <p className="text-gray-600 italic break-words whitespace-pre-wrap">
          {remarks || "No remarks added"}
        </p>
      )}

      {/* Edit Mode */}
      {isEdit && (
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 break-words"
            placeholder="Enter remarks..."
          />

          <button
            onClick={handleUpdate}
            disabled={loading || !isChanged}
            className={`flex items-center justify-center gap-2
              px-4 py-2.5
              rounded-lg
              font-semibold text-sm
              transition-all duration-200
              active:scale-95 cursor-pointer
              ${
                loading || !isChanged
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
              }`}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Updating
              </>
            ) : (
              <>
                <CheckCircle2 size={18} />
                Save
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderRemarks;
