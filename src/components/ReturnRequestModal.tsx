import { X, Camera } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/store/store";

interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Props {
  show: boolean;
  onCancel: () => void;
  onConfirm: (data: {
    selectedItems: {
      id: string;
      qty: number;
      issue: string;
    }[];
    photo: File | null;
    remarks: string;
  }) => void;

  orderId: string;
  deliveryInfo: string;
  items: Item[];
}

export default function ReturnRequestModal({
  show,
  onCancel,
  // onConfirm,
  orderId,
  deliveryInfo,
  items,
}: Props) {
  const navigate = useNavigate();
  const { createReturnRequest } = useStore();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [itemDetails, setItemDetails] = useState<{
    [key: string]: { qty: number; issue: string };
  }>({});

  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [remarks, setRemarks] = useState("");

  if (!show) return null;

  // Validate form
  const isFormValid =
    selectedItems.length > 0 && photo !== null && remarks.trim().length > 0;

  // Toggle item selection
  //   const toggleItem = (id: string, maxQty: number) => {
  //     setSelectedItems((prev) =>
  //       prev.includes(id)
  //         ? prev.filter((x) => x !== id)
  //         : [...prev, id]
  //     );

  //     // Initialize if first time
  //     setItemDetails((prev) => ({
  //       ...prev,
  //       [id]: prev[id] || { qty: 1, issue: "Spoilage" },
  //     }));
  //   };

  const toggleItem = (id: string, maxQty: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

    setItemDetails((prev) => ({
      ...prev,
      [id]: prev[id] || { qty: Math.min(1, maxQty), issue: "Spoilage" },
    }));
  };

  // Update qty
  const updateQty = (id: string, change: number, max: number) => {
    setItemDetails((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        qty: Math.min(max, Math.max(1, prev[id].qty + change)),
      },
    }));
  };

  // Update issue type
  const updateIssue = (id: string, issue: string) => {
    setItemDetails((prev) => ({
      ...prev,
      [id]: { ...prev[id], issue },
    }));
  };

  // Photo upload
  const handlePhotoUpload = (file: File | null) => {
    if (!file) return;
    setPhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const removePhoto = () => {
    setPhoto(null);
    setPreviewUrl(null);
  };

  const handleSubmit = () => {
  const payload = {
    orderId,
    products: selectedItems.map((id) => ({
      name: items.find((i) => i.id === id)?.name,
      qty: itemDetails[id].qty,
      issue: itemDetails[id].issue,
    })),
    remarks,
    photo,
  };

  console.log("RETURN REQUEST DATA:", payload);

  createReturnRequest(payload);
  onCancel();
  navigate("/damagesReturn");
};


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Return Request</h2>
          <button onClick={onCancel} className="p-1 hover:bg-gray-200 rounded">
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 space-y-6 overflow-y-auto thin-scroll flex-1">
          {/* ORDER INFO */}
          <div className="border p-4 rounded-xl">
            <p className="font-bold">Order #{orderId}</p>
            <p className="text-sm text-gray-600">{deliveryInfo}</p>
          </div>

          {/* ITEMS LIST */}
          <div>
            <p className="font-semibold mb-2">Select Damaged Items</p>

            {items.map((item) => {
              const selected = selectedItems.includes(item.id);
              const details = itemDetails[item.id];

              return (
                <div
                  key={item.id}
                  className={`border rounded-xl p-3 mb-3 transition ${
                    selected ? "bg-red-50 border-red-300" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          item.image && item.image.trim() !== ""
                            ? item.image
                            : "https://via.placeholder.com/80?text=No+Image"
                        }
                        className="w-14 h-14 rounded-lg object-cover bg-gray-100"
                      />

                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          Max Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    {/* CHECKBOX */}
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      checked={selected}
                      onChange={() => toggleItem(item.id, item.quantity)}
                    />
                  </div>

                  {/* SHOW EXTRA FIELDS ONLY IF SELECTED */}
                  {selected && (
                    <div className="mt-3 border-t pt-3 space-y-3">
                      {/* DAMAGED QTY */}
                      <div>
                        <p className="text-sm font-semibold mb-1">
                          Damaged Qty
                        </p>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQty(item.id, -1, item.quantity)
                            }
                            className="px-3 py-1 rounded border"
                          >
                            -
                          </button>

                          <span className="font-semibold">{details.qty}</span>

                          <button
                            onClick={() =>
                              updateQty(item.id, +1, item.quantity)
                            }
                            className="px-3 py-1 rounded border"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* ISSUE TYPE */}
                      <div>
                        <p className="text-sm font-semibold mb-1">Issue Type</p>

                        <select
                          value={details.issue}
                          onChange={(e) => updateIssue(item.id, e.target.value)}
                          className="w-full border rounded-lg p-2 text-sm"
                        >
                          <option>Leakage</option>
                          <option>Spoilage</option>
                          <option>Packaging Damage</option>
                          <option>Wrong Item Received</option>
                          <option>Quality Issue</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* PHOTO UPLOAD */}
          <div>
            <p className="font-semibold mb-2">Evidence (Mandatory)</p>

            {!previewUrl ? (
              <label className="border-2 border-dashed rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer">
                <Camera size={28} />
                <p className="text-gray-500 text-sm">Upload Photo</p>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handlePhotoUpload(e.target.files?.[0] ?? null)
                  }
                />
              </label>
            ) : (
              <div className="relative w-fit mt-2">
                <img
                  src={previewUrl}
                  className="w-24 h-24 object-cover rounded-xl border"
                />
                <button
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 bg-black/70 text-white rounded-full p-1"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          {/* REMARKS */}
          <div>
            <p className="font-semibold mb-2">Remarks</p>
            <textarea
              className="w-full border rounded-xl p-3 text-sm"
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Describe the issue..."
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t bg-white">
          {/* <button
            disabled={!isFormValid}
            className={`w-full py-3 rounded-xl font-semibold transition
              ${
                isFormValid
                  ? "bg-black text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            onClick={() =>
              onConfirm({
                selectedItems: selectedItems.map((id) => ({
                  id,
                  qty: itemDetails[id].qty,
                  issue: itemDetails[id].issue,
                })),
                photo,
                remarks,
              })
            }
          >
            Submit Return Request
          </button> */}
          <button
            disabled={!isFormValid}
            className={`w-full py-3 rounded-xl font-semibold
    ${isFormValid ? "bg-black text-white" : "bg-gray-300 text-gray-500"}`}
            onClick={handleSubmit}
          >
            Submit Return Request
          </button>
        </div>
      </div>
    </div>
  );
}
