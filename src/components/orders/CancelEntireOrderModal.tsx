import { useState } from "react";
import { cancelOrderApi } from "../../api/order.api";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  indentgid: number;
  onClose: () => void;
  onSuccess: () => void;
}

const CancelEntireOrderModal: React.FC<Props> = ({
  open,
  indentgid,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  if (!open) return null;



  const handleCancelOrder = async () => {
    try {
      setLoading(true);

      const res = await cancelOrderApi({ indentgid });

      // ✅ Use backend message
      if (res?.data?.error) {
        toast.error(res.data.error);
        return;
      }

      toast.success(res?.data?.success);

      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Failed to cancel order ❌",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">
      <div className="bg-white rounded-2xl w-[90%] max-w-md p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Cancel Entire Order?
        </h3>

        <p className="text-sm text-gray-500 mb-6">
          This will cancel all products in this order. This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-6">
          <button onClick={onClose} className="text-gray-500 font-medium cursor-pointer">
            CLOSE
          </button>

          <button
            onClick={handleCancelOrder}
            disabled={loading}
            className="text-red-500 font-semibold cursor-pointer"
          >
            {loading ? "Cancelling..." : "YES, CANCEL ALL"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelEntireOrderModal;
