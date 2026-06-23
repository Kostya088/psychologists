// import { useEffect, useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import css from "./Sidebar.module.css";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  onOpenLogin,
  onOpenRegister,
}: SidebarProps) {
  const { user, isLoading, logout } = useAuth();

  const sidebarClass = `${css.sidebarWrapper} ${isOpen ? css.open : ""}`;

  return (
    <div className={sidebarClass}>
      <div className={css.backdrop} onClick={onClose} />

      <div className={css.sidebarContainer}>
        <Link to="/" className={css.logoLink} onClick={onClose}>
          <span className={css.logoSpan}>psychologists.</span>services
        </Link>

        <nav className={css.navLinks}>
          <Link className={css.navLink} to="/" onClick={onClose}>
            Home
          </Link>
          <Link className={css.navLink} to="/psychologists" onClick={onClose}>
            Psychologists
          </Link>
          {!isLoading && user && (
            <Link className={css.navLink} to="/favorites">
              Favorites
            </Link>
          )}
        </nav>

        {!isLoading && !user && (
          <div className={css.authButtons}>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
              className={`${css.authButton} ${css.logInBtn}`}
            >
              Log in
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenRegister();
              }}
              className={`${css.authButton} ${css.registerInBtn}`}
            >
              Register
            </button>
          </div>
        )}

        {!isLoading && user && (
          <div className={css.authButtons}>
            <p>{user.displayName}</p>

            <button
              type="button"
              onClick={() => {
                onClose();
                logout();
              }}
              className={`${css.authButton} ${css.logInBtn}`}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
