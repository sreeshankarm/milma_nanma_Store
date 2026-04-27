import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useInvoice } from "../context/invoice/useInvoice";
import { printInvoiceApi } from "../api/invoice.api";

interface Props {
  open: boolean;
  onClose: () => void;
}

const InvoiceModal = ({ open, onClose }: Props) => {
  const { invoiceDetails, lastLocation } = useInvoice();
  const [downloading, setDownloading] = useState(false);

  if (!open) return null;

  const invoice = invoiceDetails[0];

  //   const handleTrackVehicle = () => {
  //   if (!lastLocation) return;

  //   const { current_latitude, current_longitude } = lastLocation;

  //   const url = `https://www.google.com/maps?q=${current_latitude},${current_longitude}`;
  //   window.open(url, "_blank");
  // };

  const handleTrackVehicle = () => {
    if (
      !lastLocation ||
      !lastLocation.current_latitude ||
      !lastLocation.current_longitude
    ) {
      return;
    }

    const url = `https://www.google.com/maps?q=${lastLocation.current_latitude},${lastLocation.current_longitude}`;
    window.open(url, "_blank");
  };

  const handleDownloadInvoice = async () => {
    try {
      if (!invoice?.gid || !invoice?.inv_date) return;

      setDownloading(true);

      const res = await printInvoiceApi(
        String(invoice.gid), // or inv_gid if available
        invoice.inv_date,
      );

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `Invoice_${invoice.inv_no}.pdf`;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.error || "Failed to download invoice ❌");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center">
      {/* CARD */}
      <div
        className="bg-white w-full sm:max-w-md h-[80vh]
    rounded-t-2xl sm:rounded-2xl shadow-xl animate-slideUp
    flex flex-col overflow-hidden"
      >
        {/* HEADER (FIXED) */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="font-semibold text-lg text-gray-800">
            Invoice Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            <X />
          </button>
        </div>

        {/* ✅ BODY SCROLL AREA */}
        <div
          className="flex-1 overflow-y-auto px-4 py-2
      thin-scroll"
        >
          {/* LOGO */}
          <div className="flex items-center gap-3 py-3 bg-gray-50 border border-gray-400 rounded-lg px-3 mb-3">
            <img
              src="/nanma.png"
              alt="logo"
              className="w-10 h-10 object-contain rounded-md border"
            />
            <div>
              <p className="font-semibold text-gray-800">Nanma Store</p>
              <p className="text-xs text-gray-500">Fresh Milk & Products</p>
            </div>
          </div>

          {/* INVOICE INFO */}
          <div className="text-sm space-y-2 mb-4">
            <div className="flex justify-between">
              <p className="text-gray-500">Invoice No</p>
              <p className="font-medium">#{invoice?.inv_no}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-500">Date</p>
              <p>{invoice?.inv_date}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-500">Vehicle</p>
              <p>{invoice?.veh_no}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-500">Shift</p>
              <p>{invoice?.inv_shift === 1 ? "Morning" : "Evening"}</p>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="space-y-3 pb-4">
            {invoiceDetails.map((item,index) => (
              <div
                // key={item.gid}
                 key={`${item.gid}-${index}`}
                className="border border-gray-400 rounded-xl p-3 bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.prod_name}</p>
                  <p className="text-xs text-gray-500">
                    {/* Qty: {item.qty} × ₹{item.basic_rate} */}
                    Qty: {Number(item.qty)} | Rate : ₹
                    {Number(item.basic_rate).toFixed(2)}
                  </p>
                </div>

                <p className="font-semibold text-[#0195db]">₹{Number(item.tot_amt).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER (FIXED) */}

        <div className="px-4 py-3 border-t bg-white">
          <div className="flex justify-between font-semibold mb-3">
            <p>Grand Total</p>
            <p className="text-[#0195db]">
              ₹
              {invoiceDetails
                .reduce((sum, i) => sum + Number(i.tot_amt), 0)
                .toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </p>
          </div>

          {/* ✅ TRACK VEHICLE BUTTON */}

          {/* RUNNING → ENABLED */}
          {lastLocation?.trip_status === "RUNNING" && (
            <button
              onClick={handleTrackVehicle}
              className="w-full mb-3 bg-orange-500 text-white py-3 rounded-xl font-semibold
    hover:bg-orange-600 transition cursor-pointer"
            >
              🚚 Track Vehicle
            </button>
          )}

          {/* NOT_STARTED → DISABLED */}
          {lastLocation?.trip_status === "NOT_STARTED" && (
            <button
              disabled
              className="w-full mb-3 bg-gray-300 text-gray-600 py-3 rounded-xl font-semibold cursor-not-allowed"
            >
              🚚 Trip Not Started
            </button>
          )}

          {/* DOWNLOAD BUTTON */}
   
          <button
            onClick={handleDownloadInvoice}
            disabled={downloading}
            className="w-full bg-[#0195db] text-white py-3 rounded-xl font-semibold
  hover:bg-blue-500 transition disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
          >
            {downloading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Downloading...
              </>
            ) : (
              <>⬇ Download Invoice</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
