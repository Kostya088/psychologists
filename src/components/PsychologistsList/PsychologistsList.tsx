import { useState } from "react";
import type { Psychologist } from "../../types/psychologists";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import css from "./PsychologistsList.module.css";

type PsychologistListItem = Psychologist & { id: string };

interface PsychologistsListProps {
  psychologists: PsychologistListItem[];
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
}

export default function PsychologistsList({
  psychologists,
  hasMore,
  isLoadingMore,
  onLoadMore,
}: PsychologistsListProps) {
  const [openedCardIndex, setOpenedCardIndex] = useState<number | null>(null);

  return (
    <>
      <ul className={css.psychologistsList}>
        {psychologists.map((psychologist, index) => (
          <li key={psychologist.id} className={css.psychologist}>
            <PsychologistCard
              psychologist={psychologist}
              isExpanded={openedCardIndex === index}
              onReadMore={() => setOpenedCardIndex(index)}
            />
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          className={css.loadMoreBtn}
          onClick={onLoadMore}
          disabled={isLoadingMore}
        >
          {isLoadingMore ? "Loading..." : "Load more"}
        </button>
      )}
    </>
  );
}
