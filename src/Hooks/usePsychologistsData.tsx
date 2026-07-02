import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchPsychologists,
  type PsychologistListItem,
} from "../api/fetchPsychologists";

const PAGE_SIZE = 3;

export type SortOption =
  | "default"
  | "nameAsc"
  | "nameDesc"
  | "priceAsc"
  | "priceDesc"
  | "ratingAsc"
  | "ratingDesc";

export const usePsychologistsData = () => {
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

  const handleSortChange = (event: { target: { value: string } }) => {
    setSortOption(event.target.value as SortOption);
    setVisibleCount(PAGE_SIZE);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return {
    sortedPsychologists,
    visiblePsychologists,
    hasMore,
    isLoadingMore,
    isLoading,
    isError,
    error,
    sortOption,
    handleSortChange,
    handleLoadMore,
  };
};
