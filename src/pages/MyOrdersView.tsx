import { useEffect, useState } from "react";
import { useOrder } from "../context/order/useOrder";
import DatePicker from "../components/orders/Datepicker";
import OrdersListnew from "../components/orders/OrdersListnew";
import HeaderCard from "../components/orders/HeaderCard";
import { useNavigate } from "react-router-dom";

const MyOrdersView: React.FC = () => {
  const { orders, fetchOrders, startDate, endDate, setDates } = useOrder();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    try {
      setLoading(true);
      await fetchOrders(startDate, endDate);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleFetch = async () => {
    if (!startDate || !endDate) return;

    try {
      setLoading(true);
      await fetchOrders(startDate, endDate);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(startDate, endDate);
  }, []);

  // useEffect(() => {
  //   fetchOrders(today, today);
  // }, []);

  // ---------------- FULL PAGE INITIAL LOADER ----------------
  // if (initialLoading) {
  //   return (
  //     <div className="flex flex-col items-center justify-center py-20 text-center">
  //       <div className="h-10 w-10 border-4 border-[#8e2d26] border-t-transparent rounded-full animate-spin mb-4" />
  //       <p className="text-gray-500 font-medium">Loading orders...</p>
  //     </div>
  //   );
  // }

  return (
    <div className=" h-full flex flex-col space-y-3">
      <div className="min-h-screen  p-4 sm:p-6">
        <div className="mx-auto space-y-6">
          <HeaderCard openReturns={() => navigate("/damagesReturn")} />

          <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-4 sm:p-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Start Date */}
              <DatePicker
                label="Start Date"
                value={startDate}
                max={endDate}
                // onChange={setStartDate}
                onChange={(val) => setDates(val, endDate)}
              />

              {/* End Date */}
              <DatePicker
                label="End Date"
                value={endDate}
                min={startDate}
                // max={today}
                // onChange={setEndDate}
                onChange={(val) => setDates(startDate, val)}
              />

              {/* Button */}
              <div className="md:col-span-2 mt-2">
                <button
                  onClick={handleFetch}
                  disabled={!startDate || !endDate}
                  className="w-full h-11 sm:h-12 rounded-xl bg-emerald-600 text-white font-semibold text-sm sm:text-base
        hover:bg-emerald-700 disabled:bg-gray-300 
        transition active:scale-[0.98] cursor-pointer"
                >
                  {loading ? "Loading..." : "Get Orders"}
                </button>
              </div>
            </div>
          </div>

          {/* Orders List Component */}

          {/* ------------------ LOADING UI ------------------ */}

          <OrdersListnew orders={orders} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default MyOrdersView;
