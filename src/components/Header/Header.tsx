import { Link } from "react-router-dom";
import css from "./Header.module.css";
import { useState } from "react";
import Hamburger from "hamburger-react";
import Sidebar from "../Sidebar/Sidebar";
import { Modal } from "../Modal/Modal";
import { RegisterForm } from "../RegistrationForm/RegistrationForm";
import { LoginForm } from "../LogInForm/LogInForm";

export default function Header() {
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
          <Link className={css.navLink} to="/favorites">
            Favorites
          </Link>
        </nav>

        <div className={css.authButtons}>
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
