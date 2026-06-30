import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { CartProvider } from "./context/CartContext";

window.API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const originalFetch = window.fetch;
window.fetch = function (url, options) {
  if (typeof url === "string" && url.startsWith("http://localhost:5000")) {
    url = url.replace("http://localhost:5000", window.API_URL);
  }
  return originalFetch(url, options);
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);