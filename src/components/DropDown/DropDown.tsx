import { useState, useEffect, useRef } from "react";
import css from "./DropDown.module.css";

type SortOption =
  | "default"
  | "nameAsc"
  | "nameDesc"
  | "priceAsc"
  | "priceDesc"
  | "ratingAsc"
  | "ratingDesc";

interface SortControlsProps {
  sortOption: SortOption;
  handleSortChange: (e: { target: { value: string } }) => void;
}

export default function SortControls({
  sortOption,
  handleSortChange,
}: SortControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const optionsMap = {
    default: "Show all",
    nameAsc: "A to Z",
    nameDesc: "Z to A",
    priceAsc: "Price per hour up",
    priceDesc: "Price per hour down",
    ratingAsc: "Rating up",
    ratingDesc: "Rating down",
  };

  return (
    <div className={css.controlsRow}>
      <span className={css.sortLabel}>Filters</span>

      <div className={css.dropdownWrapper} ref={wrapperRef}>
        <button
          type="button"
          className={css.customSelectTrigger}
          onClick={() => setIsOpen(!isOpen)}
        >
          {optionsMap[sortOption] || "Show all"}
          <svg
            width={20}
            height={20}
            fill="none"
            stroke="currentColor"
            className={`${css.arrow} ${isOpen ? css.arrowOpen : ""}`}
          >
            <use href="/icons.svg#icon-chevron" />
          </svg>
        </button>

        <ul
          className={`${css.customOptionsList} ${isOpen ? css.customOptionsListOpen : ""}`}
        >
          {Object.entries(optionsMap).map(([value, label]) => (
            <li key={value}>
              <button
                type="button"
                className={`${css.customOptionItem} ${sortOption === value ? css.selected : ""}`}
                onClick={() => {
                  handleSortChange({ target: { value } });
                  setIsOpen(false);
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
