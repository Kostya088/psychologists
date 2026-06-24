import type { Psychologist } from "../../types/psychologists";
import css from "./PsychologistCard.module.css";
import dividerIcon from "../../assets/Vector 3.svg";

interface PsychologistCardProps {
  psychologist: Psychologist;
  isExpanded: boolean;
  onReadMore: () => void;
}

export default function PsychologistCard({
  psychologist,
  isExpanded,
  onReadMore,
}: PsychologistCardProps) {
  return (
    <div className={css.doctorCard}>
      {/* left column */}
      <div className={css.leftColumn}>
        <img
          className={css.avatar}
          src={psychologist.avatar_url}
          alt={psychologist.name}
          width={96}
          height={96}
        />
      </div>

      {/* right column */}
      <div className={css.rightColumn}>
        <div className={css.doctorInfoWrapper}>
          <div className={css.nameWrapper}>
            <p className={css.profession}>Psychologist</p>
            <p className={css.name}>{psychologist.name}</p>
          </div>

          <div className={css.pricingWrapper}>
            <ul className={css.priceList}>
              <li className={css.rating}>Rating: {psychologist.rating}</li>
              <li className={css.devider}>
                <img src={dividerIcon} alt="" aria-hidden="true" />
              </li>
              <li className={css.price}>
                Price / 1 hour:{" "}
                <span className={css.spanPrice}>
                  {psychologist.price_per_hour}$
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className={css.baseInfo}> */}
        <ul className={css.profInfo}>
          <li className={css.infoItem}>
            Experience:{" "}
            <span className={css.infoItemSpan}>{psychologist.experience}</span>
          </li>
          <li className={css.infoItem}>
            License:{" "}
            <span className={css.infoItemSpan}>{psychologist.license}</span>
          </li>
          <li className={css.infoItem}>
            Specialization:{" "}
            <span className={css.infoItemSpan}>
              {psychologist.specialization}
            </span>
          </li>
          <li className={css.infoItem}>
            Initial consultation:{" "}
            <span className={css.infoItemSpan}>
              {psychologist.initial_consultation}
            </span>
          </li>
        </ul>

        <p className={css.about}>{psychologist.about}</p>

        {!isExpanded && (
          <button
            type="button"
            className={css.readMoreBtn}
            onClick={onReadMore}
          >
            Read more
          </button>
        )}

        <div
          className={`${css.expandedContent} ${isExpanded ? css.expandedOpen : ""}`}
        >
          <ul className={css.reviewsList}>
            {psychologist.reviews?.map((review, index) => (
              <li key={index} className={css.review}>
                <div className={css.reviewerWrapper}>
                  <div className={css.reviewerAvatar}>
                    <p>{review.reviewer[0]}</p>
                  </div>

                  <div className={css.reviewerMark}>
                    <p className={css.reviewer}>{review.reviewer}</p>
                    <p className={css.reviewerRating}>{review.rating}</p>
                  </div>
                </div>

                <p className={css.reviewerComment}>{review.comment}</p>
              </li>
            ))}
          </ul>

          <button type="button" className={css.appointmentBtn}>
            Make an appointment
          </button>
        </div>
      </div>
    </div>
  );
}
