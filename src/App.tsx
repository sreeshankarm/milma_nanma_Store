import { StoreProvider } from "./context/store/store";
import "./App.css";
import AppRouter from "./Router/AppRouter";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppRouter />
      </StoreProvider>
    </BrowserRouter>
  );
}
