// import { Routes, Route, Navigate } from "react-router-dom";
// import SignIn from "../pages/Signin";

// const AuthRouter = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<SignIn />} />
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// };

// export default AuthRouter;






import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "../pages/Signin";

const AuthRouter = () => (
  <Routes>
    <Route path="/" element={<Signin />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AuthRouter;


