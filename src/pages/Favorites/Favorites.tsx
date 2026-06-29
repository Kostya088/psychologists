import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { usePsychologistsData } from "../../Hooks/usePsychologistsData";
import css from "../Psychologists/Psychologists.module.css";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";

const PAGE_SIZE = 3;

export default function Favorites() {
  const {
    sortedPsychologists,
    isLoading,
    isError,
    sortOption,
    handleSortChange,
  } = usePsychologistsData();

  const { favorites } = useAuth();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const favoritePsychologists = sortedPsychologists.filter((psychologist) =>
    favorites.includes(psychologist.id),
  );

  const visiblePsychologists = favoritePsychologists.slice(0, visibleCount);
  const hasMore = visibleCount < favoritePsychologists.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  if (isLoading) return <p>Loading psychologists...</p>;

  return (
    <>
      <div className={css.controlsRow}>
        <label className={css.sortLabel} htmlFor="psychologists-sort">
          Sort by:
        </label>
        <select
          id="psychologists-sort"
          className={css.sortSelect}
          value={sortOption}
          onChange={(e) => {
            handleSortChange(e);
            setVisibleCount(PAGE_SIZE);
          }}
        >
          <option value="default">Show all</option>
          <option value="nameAsc">A to Z</option>
          <option value="nameDesc">Z to A</option>
          <option value="priceAsc">Price per hour up</option>
          <option value="priceDesc">Price per hour down</option>
          <option value="ratingAsc">Rating up</option>
          <option value="ratingDesc">Rating down</option>
        </select>
      </div>

      {visiblePsychologists.length === 0 ? (
        <p>No psychologists in favorites</p>
      ) : null}
      <PsychologistsList
        psychologists={visiblePsychologists}
        hasMore={hasMore}
        isLoadingMore={false}
        onLoadMore={handleLoadMore}
      />
      {isError && visiblePsychologists.length > 0 ? (
        <p>Could not load psychologists, try again later</p>
      ) : null}
    </>
  );
}
