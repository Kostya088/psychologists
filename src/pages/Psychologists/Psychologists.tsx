import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchPsychologists,
  type PsychologistListItem,
} from "../../api/fetchPsychologists";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
import css from "./Psychologists.module.css";

const PAGE_SIZE = 3;

type SortOption =
  | "default"
  | "nameAsc"
  | "nameDesc"
  | "priceAsc"
  | "priceDesc"
  | "ratingAsc"
  | "ratingDesc";

export default function Psychologists() {
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const { data, error, isLoading, isFetching, isError } = useQuery({
    queryKey: ["psychologists", sortOption],
    queryFn: fetchPsychologists,
    staleTime: 0,
  });

  const sortedPsychologists = useMemo(() => {
    const psychologists = [...(data ?? [])] as PsychologistListItem[];

    switch (sortOption) {
      case "nameAsc":
        return psychologists.sort((a, b) => a.name.localeCompare(b.name));
      case "nameDesc":
        return psychologists.sort((a, b) => b.name.localeCompare(a.name));
      case "priceAsc":
        return psychologists.sort(
          (a, b) => a.price_per_hour - b.price_per_hour,
        );
      case "priceDesc":
        return psychologists.sort(
          (a, b) => b.price_per_hour - a.price_per_hour,
        );
      case "ratingAsc":
        return psychologists.sort((a, b) => a.rating - b.rating);
      case "ratingDesc":
        return psychologists.sort((a, b) => b.rating - a.rating);
      case "default":
      default:
        return psychologists;
    }
  }, [data, sortOption]);

  const visiblePsychologists = sortedPsychologists.slice(0, visibleCount);
  const hasMore = visibleCount < sortedPsychologists.length;
  const isLoadingMore = isFetching && !isLoading;

  const errorMessage =
    error instanceof Error
      ? error.message
      : "Failed to load psychologists from Firebase.";

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value as SortOption);
    setVisibleCount(PAGE_SIZE);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  if (isLoading) return <p>Loading psychologists...</p>;

  if (isError && visiblePsychologists.length === 0) {
    return (
      <>
        <h1>Psychologists</h1>
        <p>Could not load psychologists: {errorMessage}</p>
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
        <p>Could not load psychologists: {errorMessage}</p>
      ) : null}
    </>
  );
}
