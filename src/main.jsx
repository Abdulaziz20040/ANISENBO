import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import ProductContextProvider from "./context/Context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductContextProvider>
      <App />
    </ProductContextProvider>
  </StrictMode>
);
