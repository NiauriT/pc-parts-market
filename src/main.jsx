import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PartsProvider } from "./context/PartsContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PartsProvider>
          <App />
        </PartsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
