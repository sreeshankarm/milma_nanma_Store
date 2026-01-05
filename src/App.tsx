import { StoreProvider } from "./context/store/store";
import "./App.css";
import AppRouter from "./Router/AppRouter";
// import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./context/auth/AuthContext";

import { AppProviders } from "./app/providers/AppProviders";


export default function App() {
  return (
    // <BrowserRouter>
    // <AuthProvider>
    <AppProviders>
      <StoreProvider>
        <AppRouter />
      </StoreProvider>
    </AppProviders>
    // </AuthProvider>

    // </BrowserRouter>
  );
}
