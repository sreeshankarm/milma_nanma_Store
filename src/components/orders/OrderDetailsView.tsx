import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useOrder } from "../../context/order/useOrder";
import { Sun, Moon } from "lucide-react";
import { getSettingsApi } from "../../api/settings.api";
import { useNavigate } from "react-router-dom";
import CancelEntireOrderModal from "./CancelEntireOrderModal";
import ProductModal from "../../components/ProductModal";
import { updateOrderDetailApi } from "../../api/order.api";
import { toast } from "react-toastify";
import type { OrderDetail } from "../../types/order";
import OrderRemarks from "./OrderRemarks";
import CancelOrderdetailModal from "./CancelorderdetailModal";
import AddProductListModal from "./AddProductListModal";
import { addProductToOrderApi } from "../../api/order.api";
import { useProduct } from "../../context/product/useProduct";
import { XCircle, Pencil, Trash2, PlusCircle, ArrowLeft } from "lucide-react";
import { useInvoice } from "../../context/invoice/useInvoice";
import InvoiceModal from "../InvoiceModal";
import { useAuth } from "../../context/auth/useAuth";

const OrderDetailsView = () => {
  const { gid } = useParams();
  const { orderDetails, fetchOrderDetails } = useOrder();

  const { products, fetchProducts } = useProduct();
  const { appAccess } = useAuth();

  const {
    orderInvoices,
    invoiceStatus,
    fetchOrderInvoiceStatus,
    fetchInvoiceDetails,
  } = useInvoice();

  /* fetch products once order loads */
  useEffect(() => {
    if (orderDetails.length > 0) {
      fetchProducts(orderDetails[0].supply_date);
    }
  }, [orderDetails]);

  /* fast lookup map */
  // const productMap = useMemo(() => {
  //   const map: Record<number, string | undefined> = {};
  //   products.forEach((p) => (map[p.prod_code] = p.imagepath));
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

  const [shiftcodetext, setShiftcodetext] = useState<Record<string, string>>(
    {},
  );

  const [selectedItem, setSelectedItem] = useState<OrderDetail | null>(null);
  const [cancelItem, setCancelItem] = useState<OrderDetail | null>(null);
  const [openAddList, setOpenAddList] = useState(false);
  const [selectedNewProduct, setSelectedNewProduct] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [loadingInvoiceId, setLoadingInvoiceId] = useState<number | null>(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(
    null,
  );
  const [showInvoiceDropdown, setShowInvoiceDropdown] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      if (gid) {
        await fetchOrderDetails(Number(gid));
        await fetchOrderInvoiceStatus(Number(gid));
      }

      const data = await getSettingsApi();
      setShiftcodetext(data.shiftcodetext);

      setLoading(false);
    };

    loadData();
  }, [gid]);

  const uniqueInvoices = useMemo(() => {
    const map = new Map<number, any>();

    orderInvoices.forEach((inv) => {
      if (!map.has(inv.inv_no)) {
        map.set(inv.inv_no, inv);
      }
    });

    return Array.from(map.values());
  }, [orderInvoices]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="h-10 w-10 border-4 border-[#8e2d26] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Orders details...</p>
      </div>
    );
  }

  const hasItems = orderDetails.length > 0;
  // const isMultiple = orderInvoices.length > 1;
  const isMultiple = uniqueInvoices.length > 1;
  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className=" mx-auto space-y-6">
        {/* Header */}

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Title */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
            Order Details <span className="text-[#0195db]">#{gid}</span>
          </h2>

          {/* Back Button */}
          <button
            onClick={() => navigate("/orders")}
            className="flex items-center justify-center gap-2
      w-full sm:w-auto
      px-4 py-2
      text-sm font-medium
      text-gray-700
      border border-gray-300
      rounded-lg
      bg-white
      hover:bg-gray-50
      active:scale-[0.98]
      transition-all duration-200
      shadow-sm cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Orders
          </button>
        </div>
        {hasItems && (
          <OrderRemarks
            gid={Number(gid)}
            initialRemarks={orderDetails[0]?.remarks}
             invoiceStatus={invoiceStatus}
          />
        )}
        {/* Items */}

        {!hasItems ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
            <XCircle size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium text-lg">
              No order details available
            </p>
          </div>
        ) : (
          // <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {orderDetails.map((item) => {
              const image = productMap[item.prod_code];
              // const fallback = `https://nanmastagingapi.milma.in/products/2005/${item.prod_code}.png`;
              const fallback = `https://mobile.milma.in/products/2005/${item.prod_code}.png`;

              return (
                <div
                  key={item.inddet_gid}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200  p-3 space-y-3"
                >
                  {/* Top */}
                  <div className="flex gap-3">
                    <img
                      src={image || fallback}
                      alt={item.prod_name}
                      className="w-14 h-14 rounded-lg border border-gray-200 object-cover"
                    />

                    <div className="flex-1">
                      <p className="font-semibold text-sm">{item.prod_name}</p>
                      <p className="text-xs text-[#0195db]">
                        {/* Qty: {item.ind_qty} nos */}
                        Qty: {Number(item.ind_qty).toFixed(2)} nos
                      </p>
                    </div>
                  </div>

                  {/* Shift */}
                  <div className="border border-gray-200 rounded-xl p-3 bg-orange-50">
                    <p className="text-xs text-gray-600 mb-1">
                      Supply Shift : ({item.supply_date})
                    </p>

                    <div className="flex items-center gap-2">
                      {item.supply_shift === 1 ? (
                        <Sun size={18} className="text-yellow-500" />
                      ) : (
                        <Moon size={18} className="text-indigo-500" />
                      )}

                      <div>
                        <p className="text-sm font-semibold">
                          {item.supply_shift === 1
                            ? "Morning Shift"
                            : "Evening Shift"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {shiftcodetext[item.supply_shift]}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">
                      Rate: ₹
                      {Number(item.rate).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p className="font-semibold text-[#0195db]">
                      Total: ₹
                      {Number(item.total).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    {invoiceStatus !== "success" && appAccess?.indent === 1 && (
                      <>
                        {/* Cancel Item */}
                        <button
                          onClick={() => setCancelItem(item)}
                          className="flex-1 flex items-center justify-center gap-2
                   border border-red-500 text-red-600
                   rounded-xl py-2.5 font-semibold text-sm
                   hover:bg-red-50 active:scale-[0.98]
                   transition-all duration-200 cursor-pointer"
                        >
                          <XCircle size={18} />
                          Cancel
                        </button>

                        {/* Update Item */}
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="flex-1 flex items-center justify-center gap-2
                   bg-emerald-600 text-white
                   rounded-xl py-2.5 font-semibold text-sm
                   hover:bg-emerald-700 active:scale-[0.98]
                   transition-all duration-200 shadow-sm cursor-pointer"
                        >
                          <Pencil size={18} />
                          Update
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Action Buttons */}
        {hasItems && invoiceStatus !== "success" && appAccess?.indent === 1 && (
          // <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-3 flex gap-2">
            {/* Cancel Entire Order */}
            <button
              onClick={() => setOpenModal(true)}
              className="flex-1 flex items-center justify-center gap-2
               bg-red-700 text-white
               py-3 rounded-xl font-semibold text-sm
               hover:bg-red-600 active:scale-[0.98]
               transition-all duration-200 shadow-md cursor-pointer"
            >
              <Trash2 size={18} />
              Cancel Entire Order
            </button>

            {/* Add Product */}
            <button
              onClick={() => setOpenAddList(true)}
              className="flex-1 flex items-center justify-center gap-2
               bg-[#0195db] text-white
               py-3 rounded-xl font-semibold text-sm
               hover:bg-blue-700 active:scale-[0.98]
               transition-all duration-200 shadow-md cursor-pointer"
            >
              <PlusCircle size={18} />
              Add Product
            </button>
          </div>
        )}

        {/* ✅ TOP ACTION BAR */}

        {invoiceStatus === "success" && (
          <div
            className="fixed bottom-0 left-0 w-full z-20
    bg-white/95 backdrop-blur border-t border-gray-200"
          >
            <div className="max-w-5xl mx-auto px-3 py-3 space-y-3">
              {/* 🔘 MAIN ACTION */}
              <button
                onClick={async () => {
                  if (!isMultiple && uniqueInvoices.length === 1) {
                    const inv = uniqueInvoices[0];

                    setLoadingInvoiceId(inv.inv_gid);
                    try {
                      await fetchInvoiceDetails(inv.inv_gid);
                      setOpenInvoiceModal(true);
                    } finally {
                      setLoadingInvoiceId(null);
                    }
                  }

                  if (isMultiple) {
                    setShowInvoiceDropdown((p) => !p);
                  }
                }}
                disabled={
                  !isMultiple && loadingInvoiceId === uniqueInvoices[0]?.inv_gid
                }
                className={`w-full flex items-center justify-center gap-2
          py-3 rounded-xl font-semibold text-sm
          transition-all duration-200 shadow-sm cursor-pointer
          ${
            !isMultiple && loadingInvoiceId === uniqueInvoices[0]?.inv_gid
              ? "bg-gray-300 text-white cursor-not-allowed"
              : "bg-[#0195db] text-white hover:bg-blue-600 active:scale-[0.98]"
          }`}
              >
                {!isMultiple &&
                loadingInvoiceId === uniqueInvoices[0]?.inv_gid ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Loading Invoice...
                  </>
                ) : (
                  <>📄 {isMultiple ? "Select Invoice" : "View Invoice"}</>
                )}
              </button>

              {/* 🔽 DROPDOWN CARD */}
              {isMultiple && showInvoiceDropdown && (
                <div
                  className="bg-white border border-gray-200
          rounded-2xl p-4 shadow-md space-y-3 animate-in fade-in"
                >
                  {/* SELECT */}
                  <select
                    value={selectedInvoiceId ?? ""}
                    onChange={(e) =>
                      setSelectedInvoiceId(Number(e.target.value))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
            focus:ring-2 focus:ring-[#0195db] outline-none"
                  >
                    <option value="">Select Invoice</option>
                    {uniqueInvoices.map((inv) => (
                      <option key={inv.inv_gid} value={inv.inv_gid}>
                        #{inv.inv_no} • {inv.inv_date}
                      </option>
                    ))}
                  </select>

                  {/* VIEW BUTTON */}
                  <button
                    disabled={!selectedInvoiceId || isViewing}
                    onClick={async () => {
                      if (!selectedInvoiceId) return;

                      setIsViewing(true);
                      try {
                        await fetchInvoiceDetails(selectedInvoiceId);
                        setOpenInvoiceModal(true);
                        setShowInvoiceDropdown(false);
                      } finally {
                        setIsViewing(false);
                      }
                    }}
                    className={`w-full py-2.5 rounded-lg text-sm font-semibold
              flex items-center justify-center gap-2 transition-all
              ${
                selectedInvoiceId
                  ? "bg-emerald-600 text-white hover:bg-emerald-500"
                  : "bg-gray-200 text-gray-400"
              }`}
                  >
                    {isViewing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "View Selected Invoice"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <CancelEntireOrderModal
        open={openModal}
        indentgid={Number(gid)}
        onClose={() => setOpenModal(false)}
        onSuccess={() => navigate("/orders")} // redirect after cancel
      />
      {cancelItem && (
        <CancelOrderdetailModal
          open={true}
          indentdetailgid={cancelItem.inddet_gid}
          onClose={() => setCancelItem(null)}
          onSuccess={async () => {
            await fetchOrderDetails(Number(gid));
            setCancelItem(null);
          }}
        />
      )}

      {selectedItem && (
        <ProductModal
          product={{
            prod_code: selectedItem.prod_code,
            prod_name: selectedItem.prod_name,
            // final_rate: Number(selectedItem.rate),
            final_rate: Number(selectedItem.final_rate),

            // imagepath: "",
            // mrp: "",
          }}
          supplyDate={selectedItem.supply_date}
          initialQty={Number(selectedItem.ind_qty)}
          initialShift={selectedItem.supply_shift}
          isEdit
          onClose={() => setSelectedItem(null)}
          onConfirm={async (qty, shift, date) => {
            try {
              const response = await updateOrderDetailApi({
                indentdetailgid: selectedItem.inddet_gid,
                quantity: qty,
                supplydate: date,
                supplyshift: shift,
              });

              const data = response.data; // ✅ extract data

              /* ❌ BUSINESS ERROR */
              if (!data.success) {
                toast.error(data.error || "Unable to update order item");
                return;
              }

              /* ✅ SUCCESS → show backend message */
              toast.success(String(data.success));

              await fetchOrderDetails(Number(gid));
              setSelectedItem(null);
            } catch (error: any) {
              toast.error(
                error?.response?.data?.error ||
                  error?.response?.data?.message ||
                  "Unable to update order item ❌",
              );
            }
          }}
        />
      )}

      {openAddList && (
        <AddProductListModal
          supplyDate={orderDetails[0]?.supply_date}
          onClose={() => setOpenAddList(false)}
          onSelect={(product) => {
            setOpenAddList(false);
            setSelectedNewProduct(product); // open ProductModal next
          }}
        />
      )}
      {selectedNewProduct && (
        <ProductModal
          product={selectedNewProduct}
          supplyDate={orderDetails[0]?.supply_date}
          mode="confirm"
          onClose={() => setSelectedNewProduct(null)}
          onConfirm={async (qty, shift, date) => {
            try {
              // 🔒 SAFETY CHECK HERE
              if (!selectedNewProduct?.prod_gid) {
                toast.error("Invalid product. Please try again.");
                return;
              }

              const res = await addProductToOrderApi({
                indentgid: Number(gid),
                productgid: selectedNewProduct.prod_gid,
                quantity: qty,
                supplydate: date,
                supplyshift: shift,
              });

              // ✅ Use backend success message
              // toast.success(res.data.success);

              const data = res.data; // ✅ extract data

              /* ❌ BUSINESS ERROR */
              if (!data.success) {
                toast.error(data.error || "Unable to update order item");
                return;
              }

              /* ✅ SUCCESS → show backend message */
              toast.success(String(data.success));

              await fetchOrderDetails(Number(gid));
              setSelectedNewProduct(null);
            } catch (error: any) {
              toast.error(
                error?.response?.data?.error ||
                  error?.response?.data?.message ||
                  "Add failed ❌",
              );
            }
          }}
        />
      )}

      <InvoiceModal
        open={openInvoiceModal}
        onClose={() => setOpenInvoiceModal(false)}
      />
    </div>
  );
};

export default OrderDetailsView;
