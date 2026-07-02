import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
// import css from "./Psychologists.module.css";
import { usePsychologistsData } from "../../Hooks/usePsychologistsData";
import SortControls from "../../components/DropDown/DropDown";

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
      <SortControls
        sortOption={sortOption}
        handleSortChange={handleSortChange}
      />

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
