import { useEffect, useMemo, useState } from "react";
import {
  X,
  Plus,
  Minus,
  Trash2,
  CheckSquare,
  Square,
  Package,
  Loader2,
  PlusCircle,
  Truck,
  Calendar,
} from "lucide-react";

import { useAck } from "../context/ack/useAck";
import { useProduct } from "../context/product/useProduct";
import type { InvoiceGroup, SaveAckPayload } from "../types";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth/useAuth";

interface Props {
  invoice: InvoiceGroup;
  onClose: () => void;
}

/* ROW */
interface Row {
  faultId: number;
  qty: number;
}

/* ITEM STATE */
interface ItemState {
  rows: Row[];
  remarks: string;
}

export default function ReturnRequestModal({ invoice, onClose }: Props) {
  const { faultTypes, saveAck, fetchAckList, startDate, endDate } = useAck();
  const { products, fetchProducts } = useProduct();
  const { appAccess } = useAuth();
  const canSubmit = appAccess?.indent === 1;

  const [selectedItems, setSelectedItems] = useState<Record<string, ItemState>>(
    {},
  );
  // const [loading, setLoading] = useState(false);

  // ✅ separate loading states
  const [loadingData, setLoadingData] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* FETCH PRODUCTS */
  useEffect(() => {
    if (!products.length) {
      const today = new Date().toISOString().split("T")[0];
      fetchProducts(today);
    }
  }, []);

  /* PRODUCT MAP (SAFE) */

  // const productMap = useMemo(() => {
  //   const map: Record<number, string> = {};
  //   products.forEach((p: any) => {
  //     if (p?.prod_code) map[p.prod_code] = p.imagepath || "";
  //   });
  //   return map;
  // }, [products]);

  const productMap = useMemo(() => {
    const map: Record<number, string> = {};

    products.forEach((p: any) => {
      if (p?.prod_code && p?.imagepath) {
        // ✅ FIX: clean URL
        const cleanUrl = p.imagepath
          .replace(/\\/g, "")
          .replace(/\/+/g, "/")
          .replace("https:/", "https://");

        map[p.prod_code] = cleanUrl;
      }
    });

    return map;
  }, [products]);

  /* ITEMS + ACK PARSE */
  // const items = useMemo(() => {
  //   return invoice.items.map((i: any) => ({
  //     id: String(i.invdet_gid),
  //     name: i.prod_name,
  //     qty: Number(i.qty),
  //     basic_amt: Number(i.basic_amt),
  //     image: productMap[i.prod_code] || "",
  //     inv_gid: invoice.inv_gid,
  //     invdet_gid: i.invdet_gid,
  //     acknowledgements: i.acknowledgements || [],
  //   }));
  // }, [invoice, productMap]);

  const items = useMemo(() => {
    return invoice.items.map((i: any) => {
      // const fallback = `https://nanmastagingapi.milma.in/products/2005/${i.prod_code}.png`;
      const fallback = `https://mobile.milma.in/products/2005/${i.prod_code}.png`;

      return {
        id: String(i.invdet_gid),
        name: i.prod_name,
        qty: Number(i.qty),
        basic_amt: Number(i.basic_amt),

        // ✅ MAIN FIX HERE
        image: productMap[i.prod_code] || fallback,

        inv_gid: invoice.inv_gid,
        invdet_gid: i.invdet_gid,
        acknowledgements: i.acknowledgements || [],
      };
    });
  }, [invoice, productMap]);

  const totalQty = items.reduce((a, b) => a + b.qty, 0);
  /* 🔥 FIX: TOTAL AMOUNT CORRECT */
  const totalAmount = items.reduce(
    (sum, item) => sum + (Number(item.basic_amt) || 0),
    0,
  );

  /* 🔥 FIX: used qty helper */
  const getUsedQty = (id: string) =>
    selectedItems[id]?.rows.reduce((sum, r) => sum + r.qty, 0) || 0;

  /* VIEW MODE (ACK EXISTS) */
  const isViewMode = useMemo(() => {
    return items.some((i) => i.acknowledgements?.length > 0);
  }, [items]);

  /* SELECT ITEM */

  const handleSelect = (id: string) => {
    if (isViewMode) return;

    setSelectedItems((prev) => {
      const copy = { ...prev };

      if (copy[id]) delete copy[id];
      else {
        copy[id] = {
          rows: [{ faultId: faultTypes?.[0]?.id ?? 1, qty: 1 }],
          remarks: "",
        };
      }

      return copy;
    });
  };

  /* ADD ROW */

  const addRow = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    const used = getUsedQty(id);

    // ❌ if already fully used
    if (used >= item.qty) return;

    setSelectedItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        rows: [
          ...prev[id].rows,
          {
            faultId: faultTypes?.[0]?.id ?? 1,
            qty: 1,
          },
        ],
      },
    }));
  };

  /* CHANGE QTY */

  const changeQty = (id: string, index: number, delta: number) => {
    setSelectedItems((prev) => {
      const item = items.find((i) => i.id === id);
      if (!item) return prev;

      const rows = prev[id].rows.map((r) => ({ ...r }));

      const currentTotal = rows.reduce((sum, r) => sum + r.qty, 0);
      const currentQty = rows[index].qty;

      let newQty = currentQty + delta;

      // ❌ prevent less than 1
      if (newQty < 1) return prev;

      // ❌ prevent total overflow
      const newTotal = currentTotal - currentQty + newQty;
      if (newTotal > item.qty) return prev;

      rows[index].qty = newQty;

      return {
        ...prev,
        [id]: { ...prev[id], rows },
      };
    });
  };

  /* DELETE ROW (FIRST PROTECTED) */

  const deleteRow = (id: string, index: number) => {
    if (index === 0) return;

    setSelectedItems((prev) => {
      const rows = [...prev[id].rows];
      rows.splice(index, 1);
      return { ...prev, [id]: { ...prev[id], rows } };
    });
  };

  /* CHANGE FAULT */

  const changeFault = (id: string, index: number, faultId: number) => {
    setSelectedItems((prev) => {
      const rows = [...prev[id].rows];
      rows[index].faultId = faultId;
      return { ...prev, [id]: { ...prev[id], rows } };
    });
  };

  /* REMARKS */

  const changeRemarks = (id: string, value: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: { ...prev[id], remarks: value },
    }));
  };

  /* SUBMIT */

  // const handleSubmit = async () => {
  //   try {
  //     // setLoading(true);
  //      setSubmitting(true);

  //     const payload: SaveAckPayload = {
  //       items: Object.entries(selectedItems).map(([id, data]) => {
  //         const item = items.find((i) => i.id === id)!;

  //         return {
  //           inv_gid: item.inv_gid,
  //           invdet_gid: item.invdet_gid,
  //           remarks: data.remarks,
  //           faults: faultTypes.map((f: any) => ({
  //             fault_id: f.id,
  //             fault_name: f.name,
  //             qty: data.rows.find((r) => r.faultId === f.id)?.qty ?? 0,
  //           })),
  //         };
  //       }),
  //     };

  //     await saveAck(payload);
  //     onClose();
  //   } finally {
  //     // setLoading(false);
  //      setSubmitting(false);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const payload: SaveAckPayload = {
        items: Object.entries(selectedItems).map(([id, data]) => {
          const item = items.find((i) => i.id === id)!;

          return {
            inv_gid: item.inv_gid,
            invdet_gid: item.invdet_gid,
            remarks: data.remarks,
            faults: faultTypes.map((f: any) => ({
              fault_id: f.id,
              fault_name: f.name,
              qty: data.rows.find((r) => r.faultId === f.id)?.qty ?? 0,
            })),
          };
        }),
      };

      const res = await saveAck(payload);

      /* ✅ SUCCESS */

      if (res.status === "success" && res.saved > 0) {
        toast.success(res.msg || "Saved successfully");

        // ✅ REFRESH LIST WITH SAME DATE
        await fetchAckList(startDate, endDate);

        onClose();
        return;
      }

      /* ⚠️ VALIDATION ERRORS */
      if (res.errors?.length) {
        // Option 1: multiple toast
        res.errors.forEach((err) => toast.error(err));

        // Option 2 (clean): single toast
        // toast.error(res.errors.join("\n"));

        return;
      }

      /* ❌ FALLBACK */
      toast.error(res.msg || "Failed to save");
    } catch (error) {
      toast.error("Server error. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* VALIDATION */

  const isValid =
    Object.keys(selectedItems).length > 0 &&
    Object.values(selectedItems).every((i) => i.remarks.trim().length > 0);

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       setLoading(true);

  //       const today = new Date().toISOString().split("T")[0];

  //       // ✅ call products API
  //       await fetchProducts(today);

  //       // (optional) if separate ack API per invoice
  //       // await fetchAckDetails(invoice.inv_gid);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadData();
  // }, [invoice.inv_gid]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingData(true);
        const today = new Date().toISOString().split("T")[0];
        await fetchProducts(today);
      } finally {
        setLoadingData(false);
      }
    };
    load();
  }, [invoice.inv_gid]);

  return (
    // <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-end sm:items-center">
      {/* <div className="bg-white w-full max-w-2xl h-[92vh] rounded-2xl shadow-xl flex flex-col overflow-hidden"> */}
      {/* <div className="relative bg-white w-full max-w-2xl h-[92vh] rounded-2xl shadow-xl flex flex-col overflow-hidden"> */}
      <div className="relative bg-white w-full sm:max-w-2xl h-[95dvh] sm:h-[92vh] rounded-t-3xl sm:rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* ✅ LOADER OVERLAY */}
        {loadingData && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/70 ">
            <div className="h-10 w-10 border-2 border-[#8e2d26] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {/* HEADER */}
        <div className="border-b px-6 py-4 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2 font-semibold text-gray-800">
            <Package size={18} />
            {/* Return Request */}
            {isViewMode ? "View Acknowledgement" : "Return Request"}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 bg-gray-50 thin-scroll">
          {/* SUMMARY */}
          <div
            // className="rounded-xl border border-gray-400 bg-white p-4 shadow-sm"
            className={`
    rounded-xl border p-4 shadow-sm
    ${isViewMode ? "bg-blue-50 border-blue-300" : "bg-white border-gray-300"}
  `}
          >
            <p className="font-semibold text-gray-800 mb-2">
              Invoice: #{invoice.inv_no}
            </p>

            <div className="flex justify-between text-sm text-gray-600">
              <span className="text-xs text-gray-600 italic">
                Total Qty: {totalQty}
              </span>

              {/* <span className="font-semibold text-[#0195db]">
                Total : ₹{totalAmount.toFixed(2)}
              </span> */}
              <span className="font-semibold text-[#0195db] flex items-center gap-1">
                {isViewMode ? (
                  <>
                    <Calendar size={14} />
                    <span>{invoice.inv_date}</span>
                  </>
                ) : (
                  <>Total : ₹{totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</>
                )}
              </span>
            </div>

            <p className="text-xs text-gray-600 italic mt-1 flex items-center gap-1">
              {isViewMode && <Truck size={14} className="text-gray-600" />}
              Vehicle: {invoice.vehicle_full}
            </p>
          </div>

          {/* TITLE */}
          <p className="text-sm font-semibold text-gray-700">
            {isViewMode ? "Reported Issues" : "Select Damaged Items"}
          </p>

          {/* ITEMS */}
          <div className="space-y-4">
            {items.map((item) => {
              const active = !!selectedItems[item.id];
              const rows = selectedItems[item.id]?.rows || [];
              const usedQty = getUsedQty(item.id);

              return (
                <div
                  key={item.id}
                  className={`rounded-xl border p-4 transition ${
                    active
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {/* ITEM HEADER */}
                  <div
                    // onClick={() => handleSelect(item.id)}
                    // className="flex items-center gap-3 cursor-pointer"
                    onClick={() => !isViewMode && handleSelect(item.id)}
                    className={`flex items-center gap-3 ${
                      isViewMode ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/80"}
                      className="w-12 h-12 rounded-md object-cover"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Invoice Qty: {item.qty}
                      </p>
                    </div>

                    {/* {!isViewMode && active ? (
                      <CheckSquare className="text-red-500" size={18} />
                    ) : (
                      <Square className="text-gray-400" size={18} />
                    )} */}
                    {!isViewMode &&
                      (active ? (
                        <CheckSquare className="text-red-500" size={18} />
                      ) : (
                        <Square className="text-gray-400" size={18} />
                      ))}
                  </div>

                  {/* VIEW MODE */}

                  {isViewMode && (
                    <div className="mt-3">
                      {item.acknowledgements.length === 0 ? (
                        <p className="text-xs text-gray-400 italic">
                          No issues reported
                        </p>
                      ) : (
                        item.acknowledgements.map((ack: any, i: number) => (
                          <div key={i} className="bg-gray-100 p-2 rounded mb-2">
                            {ack.faults.map((f: any) => (
                              <div
                                key={f.fault_id}
                                className="flex justify-between text-sm"
                              >
                                <span
                                  className={
                                    f.fault_name === "Good"
                                      ? "text-green-600"
                                      : "text-red-500"
                                  }
                                >
                                  {f.fault_name}
                                </span>
                                <span className="text-xs text-gray-600 italic">
                                  Qty: {f.qty}
                                </span>
                              </div>
                            ))}
                            <p className="text-xs text-gray-500 mt-1">
                              Remark: {ack.remarks}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* ACTIVE CONTENT */}
                  {!isViewMode && active && (
                    <div className="mt-4 space-y-3">
                      {rows.map((row, i) => {
                        const totalUsed = getUsedQty(item.id);
                        const remaining = item.qty - totalUsed + row.qty;

                        return (
                          <div
                            key={i}
                            className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-2"
                          >
                            {/* DROPDOWN */}
                            <select
                              value={row.faultId}
                              onChange={(e) =>
                                changeFault(item.id, i, Number(e.target.value))
                              }
                              className="flex-1 border border-gray-400 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#339cff]"
                            >
                              {faultTypes.map((f: any) => (
                                <option key={f.id} value={f.id}>
                                  {f.name}
                                </option>
                              ))}
                            </select>

                            {/* QTY CONTROL */}
                            <div className="flex items-center border border-gray-400 rounded-lg ">
                              <button
                                disabled={row.qty === 1}
                                onClick={() => changeQty(item.id, i, -1)}
                                className={`px-2 py-1 ${
                                  row.qty === 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                              >
                                <Minus size={14} />
                              </button>

                              <span className="px-3 text-sm">{row.qty}</span>

                              <button
                                disabled={row.qty >= remaining}
                                onClick={() => changeQty(item.id, i, 1)}
                                className={`px-2 py-1 ${
                                  row.qty >= remaining
                                    ? "opacity-40 cursor-not-allowed"
                                    : ""
                                }`}
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            {/* DELETE */}
                            <button
                              disabled={i === 0}
                              onClick={() => deleteRow(item.id, i)}
                              className={`${
                                i === 0
                                  ? "text-gray-300 cursor-not-allowed disabled:opacity-30"
                                  : "text-red-500 hover:text-red-600"
                              }`}
                            >
                              <Trash2 size={16} className="text-red-500" />
                            </button>
                          </div>
                        );
                      })}

                      {/* ADD */}

                      <button
                        disabled={usedQty >= item.qty}
                        onClick={() => addRow(item.id)}
                        className="text-green-600 text-xs flex items-center gap-1 font-medium disabled:opacity-40 cursor-pointer"
                      >
                        <PlusCircle size={14} />
                        Add Another Damage Entry
                      </button>

                      {/* REMARKS PER ITEM */}
                      <textarea
                        placeholder={`Remarks for ${item.name}`}
                        value={selectedItems[item.id]?.remarks || ""}
                        onChange={(e) => changeRemarks(item.id, e.target.value)}
                        className="w-full border  border-gray-400 rounded-xl p-3 text-sm outline-none focus:border-[#339cff] "
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}

        {!isViewMode && canSubmit && (
          <div className="border-t p-4 bg-white">
            <button
              // disabled={!isValid || loading}
              disabled={!isValid || submitting}
              onClick={handleSubmit}
              // className={`w-full py-3 rounded-xl text-white font-medium transition ${
              //   isValid
              //     ? "bg-black hover:bg-gray-900"
              //     : "bg-gray-300 cursor-not-allowed"
              // }`}

              className={`w-full py-3 rounded-xl text-sm font-semibold text-white flex justify-center items-center gap-2 cursor-pointer  ${
                isValid ? "bg-gray-900 hover:bg-black" : "bg-gray-300"
              }`}
            >
              {/* {loading ? "Submitting..." : "Submit Return Request"} */}
              {submitting && <Loader2 className="animate-spin" size={18} />}
              {/* {submitting ? "Submitting..." : "Submit Return Request"} */}
              Submit Return Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
