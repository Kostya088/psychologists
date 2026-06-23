import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import css from "./RootLayout.module.css";
import { useAuth } from "../Hooks/useAuth";

export default function RootLayout() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={css.appWrapper}>
        <main className={css.loadingScreen}>Loading session...</main>
      </div>
    );
  }

  return (
    <div className={css.appWrapper}>
      <Header />
      <main className={css.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}
