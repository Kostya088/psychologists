// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./components/AuthProvider/AuthContext.tsx";
import QueryProvider from "./components/QueryProvider/QueryProvider.tsx";

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <QueryProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </QueryProvider>,
);
