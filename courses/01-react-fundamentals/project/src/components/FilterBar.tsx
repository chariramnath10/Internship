import { useEffect, useRef } from "react";
import Button from "./Button";

interface FilterBarProps {
  filter?: "all" | "active" | "completed";

  onFilterChange?: (
    filter: "all" | "active" | "completed",
  ) => void;

  categoryFilter?: string;

  onCategoryChange?: (category: string) => void;

  categories?: string[];

  sortOrder?:
    | "recent"
    | "high-low"
    | "low-high"
    | "alphabetical"
    | "due-date";

  onSortChange?: (
    sort:
      | "recent"
      | "high-low"
      | "low-high"
      | "alphabetical"
      | "due-date",
  ) => void;

  searchText?: string;

  // Used by the Challenge 23 functional test
  searchQuery?: string;

  onSearchChange?: (value: string) => void;
}

export default function FilterBar({
  filter = "all",
  onFilterChange = () => {},
  categoryFilter = "all",
  onCategoryChange = () => {},
  categories = [],
  sortOrder = "recent",
  onSortChange = () => {},
  searchText,
  searchQuery,
  onSearchChange = () => {},
}: FilterBarProps) {
  // Challenge 23: reference to the actual search input
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Challenge 23: focus search input once when FilterBar mounts
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // Support both the existing app prop and the review test prop
  const currentSearchText = searchText ?? searchQuery ?? "";

  return (
    <div id="filter-bar">
      <Button
        type="button"
        variant={filter === "all" ? "primary" : "secondary"}
        onClick={() => onFilterChange("all")}
      >
        All
      </Button>

      <Button
        type="button"
        variant={filter === "active" ? "primary" : "secondary"}
        onClick={() => onFilterChange("active")}
      >
        Active
      </Button>

      <Button
        type="button"
        variant={filter === "completed" ? "primary" : "secondary"}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </Button>

      <select
        id="category-filter"
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="all">All categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        id="sort-order"
        value={sortOrder}
        onChange={(e) =>
          onSortChange(
            e.target.value as
              | "recent"
              | "high-low"
              | "low-high"
              | "alphabetical"
              | "due-date",
          )
        }
      >
        <option value="recent">Recently Added</option>

        <option value="high-low">
          Priority: High to Low
        </option>

        <option value="low-high">
          Priority: Low to High
        </option>

        <option value="alphabetical">
          Alphabetical
        </option>

        <option value="due-date">
          Due Date (Soonest First)
        </option>
      </select>

      {/* Challenge 23 search input */}
      <input
        ref={searchInputRef}
        id="search-input"
        type="text"
        placeholder="Search tasks..."
        value={currentSearchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {currentSearchText && (
        <Button
          id="clear-search"
          type="button"
          variant="secondary"
          onClick={() => onSearchChange("")}
        >
          Clear search
        </Button>
      )}
    </div>
  );
}