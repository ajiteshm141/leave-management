import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Routes from "./routes.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Routes />
    <div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  </React.StrictMode>
);
