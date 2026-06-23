import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import css from "./RootLayout.module.css";

export default function RootLayout() {
  return (
    <div className={css.appWrapper}>
      <Header />
      <main className={css.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}
