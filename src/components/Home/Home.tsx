import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../Modal/Modal";
import { RegisterForm } from "../RegistrationForm/RegistrationForm";
import { useAuth } from "../../Hooks/useAuth";
import css from "./Home.module.css";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleClick = () => {
    if (user) {
      navigate("/psychologists");
      return;
    }

    setIsRegisterOpen(true);
  };

  return (
    <div className={css.homePage}>
      <div className={css.textContainer}>
        <h1 className={css.mainHeading}>
          The road to the <span className={css.headingSpan}>depths</span> of the
          human soul
        </h1>
        <p className={css.homeText}>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <button className={css.getStartedBtn} onClick={handleClick}>
          Get started
          <svg className={css.arrowIcon}>
            <use href="/icons.svg#icon-arrow-top-right" />
          </svg>
        </button>
      </div>

      <div className={css.imageContainer}>
        <img
          className={css.homeImage}
          src="/home-page.jpg"
          srcSet="/home-page.jpg 1x, /home-page@2x.jpg 2x"
          alt="Hero"
        />

        <svg className={css.contactsIcon}>
          <use href="/icons.svg#icon-contacts" />
        </svg>

        <svg className={css.questionIcon}>
          <use href="/icons.svg#icon-question-mark" />
        </svg>

        <div className={css.floatingContainer}>
          <div className={css.iconContainer}>
            <svg className={css.tickIcon}>
              <use href="/icons.svg#icon-tick" />
            </svg>
          </div>

          <div className={css.infoContainer}>
            <p className={css.infoText}>Experienced psychologists</p>
            <p className={css.infoNumber}>15,000</p>
          </div>
        </div>
      </div>

      <Modal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
        <RegisterForm onSuccess={() => setIsRegisterOpen(false)} />
      </Modal>
    </div>
  );
}
