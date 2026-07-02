import { Link } from "react-router-dom";
import css from "./Header.module.css";
import { useState } from "react";
import Hamburger from "hamburger-react";
import Sidebar from "../Sidebar/Sidebar";
import { Modal } from "../Modal/Modal";
import { RegisterForm } from "../RegistrationForm/RegistrationForm";
import { LoginForm } from "../LogInForm/LogInForm";
import { useAuth } from "../../Hooks/useAuth";

export default function Header() {
  const { user, isLoading, logout } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <Link to="/" className={css.logoLink}>
          <span className={css.logoSpan}>psychologists.</span>services
        </Link>

        <nav className={css.nav}>
          <Link className={css.navLink} to="/">
            Home
          </Link>
          <Link className={css.navLink} to="/psychologists">
            Psychologists
          </Link>
          {isLoading ? (
            <span className={`${css.navLink} ${css.navPlaceholder}`}>
              Favorites
            </span>
          ) : user ? (
            <Link className={css.navLink} to="/favorites">
              Favorites
            </Link>
          ) : null}
        </nav>

        <div className={css.authButtons}>
          {isLoading ? (
            <div className={css.authButtonsPlaceholder} aria-hidden="true" />
          ) : user ? (
            <>
              <div className={css.userInfoWrapper}>
                <div className={css.userAvatarWrapper}>
                  <svg className={css.userIcon}>
                    <use href="/icons.svg#icon-user" />
                  </svg>
                </div>

                <p className={css.userName}>{user.displayName ?? "User"}</p>
              </div>

              <button
                type="button"
                onClick={() => logout()}
                className={`${css.authButton} ${css.logInBtn}`}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsLoginOpen(true)}
                className={`${css.authButton} ${css.logInBtn}`}
              >
                Log in
              </button>
              <button
                onClick={() => setIsRegisterOpen(true)}
                type="button"
                className={`${css.authButton} ${css.registerInBtn}`}
              >
                Register
              </button>
            </>
          )}
        </div>

        <div className={css.hamburgerWrapper}>
          <Hamburger size={24} toggled={isOpen} toggle={setOpen} />
        </div>
      </div>
      <Sidebar
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <LoginForm onSuccess={() => setIsLoginOpen(false)} />
      </Modal>

      <Modal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
        <RegisterForm onSuccess={() => setIsRegisterOpen(false)} />
      </Modal>
    </header>
  );
}
