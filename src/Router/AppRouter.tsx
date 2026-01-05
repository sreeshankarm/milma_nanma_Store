


// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HashRouter, Routes, Route } from "react-router-dom";

import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import ProtectedRoute from "../Router/ProtectedRoute";

const AppRouter = () => (
  // <BrowserRouter>
  <HashRouter>
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
   {/* </BrowserRouter> */}
   </HashRouter>

);

export default AppRouter;
