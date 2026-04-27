import { useState, useEffect } from "react";
import { ArrowRight, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAck } from "../context/ack/useAck";
import ReturnList from "../components/ReturnList";
import type { InvoiceGroup } from "../types";
import ReturnRequestModal from "../components/ReturnRequestModal";

export default function ReturnRequestsView() {
  const { fetchAckList, ackList, startDate, endDate, setDates } = useAck();
  const [selectedInv, setSelectedInv] = useState<InvoiceGroup | null>(null);

  const navigate = useNavigate();

  // const today = new Date().toISOString().split("T")[0];

  // const [startDate, setStartDate] = useState(today);
  // const [endDate, setEndDate] = useState(today);
  const [loading, setLoading] = useState(false);

  const loadReturns = async () => {
    try {
      setLoading(true);
      await fetchAckList(startDate, endDate);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- NEW REQUEST ---------- */

  const handleNewRequest = () => {
    navigate("/orders");
  };

  /* ---------- FILTER ---------- */

  // const handleFetch = async () => {
  //   if (!startDate || !endDate) return;

  //   try {
  //     setLoading(true);
  //     await fetchAckList(startDate, endDate);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  /* ---------- LOAD RETURNS ---------- */

  useEffect(() => {
    loadReturns();
  }, []);




   const handleFetch = async () => {
    if (!startDate || !endDate) return;

    try {
      setLoading(true);
      await fetchAckList(startDate, endDate);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAckList(startDate, endDate);
  }, []);

  return (
    <div className="p-5 mx-auto">
      {/* HEADER */}

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Return Requests</h1>

     
      </div>

      {/* START CARD */}

      <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 px-5 py-4 text-white">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
          <RefreshCcw size={22} />
        </div>

        <div className="flex-1">
          <p className="text-lg font-semibold">Start a new return</p>

          <p className="text-sm opacity-90">Pick order date range to begin</p>
        </div>

        <button
          onClick={handleNewRequest}
          className="flex items-center gap-2 rounded-xl bg-white px-5 py-2 text-sm font-semibold text-red-600"
        >
          Begin
          <ArrowRight size={16} />
        </button>
      </div>

      {/* DATE FILTER */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputDate
            label="Start Date"
            value={startDate}
            max={endDate}
            // onChange={setStartDate}
             onChange={(val: string) => setDates(val, endDate)}
          />

          <InputDate
            label="End Date"
            value={endDate}
            min={startDate}
            // max={today}
            // onChange={setEndDate}
            onChange={(val: string) => setDates(startDate, val)}
          />

          <div className="sm:col-span-2 mt-3">
            <button
              onClick={handleFetch}
              disabled={!startDate || !endDate}
              className="w-full h-11 sm:h-12 rounded-xl bg-emerald-600 text-white font-semibold
              hover:bg-emerald-700 disabled:bg-gray-300 cursor-pointer "
            >
              {loading ? "Loading..." : "Get Requests"}
            </button>
          </div>
        </div>
      </div>

      {/* RETURN LIST */}

      <ReturnList
        items={ackList}
        loading={loading}
        // onSelect={(inv) => setSelectedInv(inv)}
        onSelect={setSelectedInv}
      />

      {selectedInv && (
        <ReturnRequestModal
          invoice={selectedInv}
          onClose={() => setSelectedInv(null)}
        />
      )}
    </div>
  );
}

/* ---------- DATE INPUT ---------- */

const InputDate = ({ label, value, onChange, min, max }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-2">
      {label}
    </label>

    <input
      type="date"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.currentTarget.showPicker()}
      onKeyDown={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm
      focus:ring-2 focus:ring-emerald-500 focus:outline-none"
    />
  </div>
);
