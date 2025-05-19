import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n";
import { QueryProvider } from "./providers/QueryProvider";
import { DebateProvider } from "./contexts/DebateContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <DebateProvider>
        <App />
      </DebateProvider>
    </QueryProvider>
  </React.StrictMode>
);
