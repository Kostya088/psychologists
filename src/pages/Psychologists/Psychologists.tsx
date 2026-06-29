import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
import css from "./Psychologists.module.css";
import { usePsychologistsData } from "../../Hooks/usePsychologistsData";

export default function Psychologists() {
  const {
    visiblePsychologists,
    hasMore,
    isLoadingMore,
    isLoading,
    isError,
    sortOption,
    handleSortChange,
    handleLoadMore,
  } = usePsychologistsData();

  if (isLoading) return <p>Loading psychologists...</p>;

  if (isError && visiblePsychologists.length === 0) {
    return (
      <>
        <h1>Psychologists</h1>
        <p>Could not load psychologists, try again later</p>
      </>
    );
  }

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
          onChange={handleSortChange}
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
        <p>No psychologists found.</p>
      ) : null}
      <PsychologistsList
        psychologists={visiblePsychologists}
        hasMore={hasMore}
        isLoadingMore={isLoadingMore}
        onLoadMore={handleLoadMore}
      />
      {isError && visiblePsychologists.length > 0 ? (
        <p>Could not load psychologists, try again later</p>
      ) : null}
    </>
  );
}
