import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./components/AuthProvider/AuthContext.tsx";
import QueryProvider from "./components/QueryProvider/QueryProvider.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <QueryProvider>
    <AuthProvider>
      <App />
      <Toaster />
    </AuthProvider>
  </QueryProvider>,
);
