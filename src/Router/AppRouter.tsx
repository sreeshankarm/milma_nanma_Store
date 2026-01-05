// import { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import HomeView from "../pages/HomeView";
// import CartView from "../pages/CartView";
// import { useStore } from "../context/store/store";
// import type { CartItem } from "../types/types";
// import { Suspense, lazy } from "react";
// import Loader from "../components/Loader";
// import { useRouteLoader } from "../Hooks/useRouteLoader";
// import PageNotFound from "../pages/PageNotFound";
// import MyOrdersView from "../pages/MyOrdersView";
// import ReturnRequestsView from "../pages/ReturnRequestsView";
// import DistributorDirectory from "../pages/DistributorDirectory";
// import FeedbackCenter from "../pages/FeedbackCenter";
// import { MyWalletView } from "../pages/MyWalletView";
// import { MyProfileView } from "../pages/MyProfileView";
// import SignIn from "../pages/Signin";

// // Lazy imports
// // const HomeView = lazy(() => import("../pages/HomeView"));
// // const CartView = lazy(() => import("../pages/CartView"));

// export default function AppRouter() {
//   const [open, setOpen] = useState(false);
//   const { cart } = useStore();
//   const loading = useRouteLoader();

//   return (
//     <>
//       {/* Sidebar */}
//                             <Route path="/signin" element={<SignIn />} />

//       <Sidebar open={open} onClose={() => setOpen(false)} />

//       <div className="flex flex-col min-h-screen">
//         {/* Navbar */}
//         <Navbar
//           onMenuClick={() => setOpen(true)}
//           cartCount={cart.reduce(
//             (sum: number, item: CartItem) => sum + item.quantity,
//             0
//           )}
//         />

//         {/* Content */}
//         <main className="p-4 ">
//           {/* <Suspense fallback={<Loader />}>
//             <Routes>
//               <Route path="/" element={<HomeView />} />
//               <Route path="/cart" element={<CartView />} />
//             </Routes>
//           </Suspense> */}

//           {loading ? (
//             <Loader /> // 👈 show Loader when clicking sidebar
//           ) : (
//             <Suspense fallback={<Loader />}>
//               <Routes>
//                 <Route path="/" element={<HomeView />} />
//                 <Route path="/cart" element={<CartView />} />
//                 <Route path="/orders" element={<MyOrdersView />} />
//                 <Route path="/DamagesReturn" element={<ReturnRequestsView />} />
//                 <Route path="/Mydistributors" element={<DistributorDirectory/>} />
//                 <Route path="/FeedbackComplaints" element={<FeedbackCenter/>} />
//                 <Route path="/wallet" element={<MyWalletView/>} />
//                 <Route path="/profile" element={<MyProfileView/>} />



//                 <Route path="*" element={<PageNotFound />} />
//               </Routes>
//             </Suspense>
//           )}
//         </main>
//       </div>
//     </>
//   );
// }






import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import ProtectedRoute from "../Router/ProtectedRoute";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/signin/*" element={<AuthRouter />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <MainRouter />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
