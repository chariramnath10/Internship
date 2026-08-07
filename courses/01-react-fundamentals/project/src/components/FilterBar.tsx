

interface FilterBarProps {
  filter: 'all' | 'active' | 'completed'
  onFilterChange: (
    filter: 'all' | 'active' | 'completed'
  ) => void
  sortOrder:
    | 'recent'
    | 'high-low'
    | 'low-high'
    | 'alphabetical'
  onSortChange: (
    sort:
      | 'recent'
      | 'high-low'
      | 'low-high'
      | 'alphabetical'
  ) => void
  searchText: string
  onSearchChange: (value: string) => void
  category: string
  categories: string[]
  onCategoryChange: (category: string) => void
}

export default function FilterBar({
  filter,
  onFilterChange,
  sortOrder,
  onSortChange,
  searchText,
  onSearchChange,
  category,
  categories,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div id="filter-bar">
      <button
        type="button"
        data-active={filter === 'all'}
        onClick={() => onFilterChange('all')}
      >
        All
      </button>

      <button
        type="button"
        data-active={filter === 'active'}
        onClick={() => onFilterChange('active')}
      >
        Active
      </button>

      <button
        type="button"
        data-active={filter === 'completed'}
        onClick={() =>
          onFilterChange('completed')
        }
      >
        Completed
      </button>

      <select
        id="category-filter"
        value={category}
        onChange={(e) =>
          onCategoryChange(e.target.value)
        }
      >
        <option value="">
          All categories
        </option>

        {categories.map((categoryName) => (
          <option
            key={categoryName}
            value={categoryName}
          >
            {categoryName}
          </option>
        ))}
      </select>

      <select
        id="sort-order"
        value={sortOrder}
        onChange={(e) =>
          onSortChange(
            e.target.value as
              | 'recent'
              | 'high-low'
              | 'low-high'
              | 'alphabetical'
          )
        }
      >
        <option value="recent">
          Recently Added
        </option>
        <option value="high-low">
          Priority: High to Low
        </option>
        <option value="low-high">
          Priority: Low to High
        </option>
        <option value="alphabetical">
          Alphabetical
        </option>
      </select>

      <input
        id="search-input"
        type="text"
        placeholder="Search tasks..."
        value={searchText}
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
      />

      {searchText && (
        <button
          id="clear-search"
          type="button"
          onClick={() => onSearchChange('')}
        >
          Clear search
        </button>
      )}
    </div>
  )
}