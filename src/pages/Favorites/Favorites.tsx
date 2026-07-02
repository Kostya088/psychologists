import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { usePsychologistsData } from "../../Hooks/usePsychologistsData";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
import SortControls from "../../components/DropDown/DropDown";

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
      <SortControls
        sortOption={sortOption}
        handleSortChange={handleSortChange}
      />

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
