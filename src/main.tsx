// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./components/AuthProvider/AuthContext.tsx";

createRoot(document.getElementById("root") as HTMLDivElement).render(
  // <StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>,
  // </StrictMode>,
);
