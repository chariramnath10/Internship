interface FilterBarProps {
  filter: 'all' | 'active' | 'completed'
  onFilterChange: (
    filter: 'all' | 'active' | 'completed'
  ) => void

  categoryFilter: string
  onCategoryChange: (
    category: string
  ) => void

  categories: string[]

  sortOrder:
    | 'recent'
    | 'high-low'
    | 'low-high'
    | 'alphabetical'
    | 'due-date'

  onSortChange: (
    sort:
      | 'recent'
      | 'high-low'
      | 'low-high'
      | 'alphabetical'
      | 'due-date'
  ) => void

  searchText: string
  onSearchChange: (value: string) => void
}

export default function FilterBar({
  filter,
  onFilterChange,
  categoryFilter,
  onCategoryChange,
  categories,
  sortOrder,
  onSortChange,
  searchText,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div id="filter-bar">
      <button
        type="button"
        data-active={filter === 'all'}
        onClick={() =>
          onFilterChange('all')
        }
      >
        All
      </button>

      <button
        type="button"
        data-active={
          filter === 'active'
        }
        onClick={() =>
          onFilterChange('active')
        }
      >
        Active
      </button>

      <button
        type="button"
        data-active={
          filter === 'completed'
        }
        onClick={() =>
          onFilterChange('completed')
        }
      >
        Completed
      </button>

      <select
        id="category-filter"
        value={categoryFilter}
        onChange={(e) =>
          onCategoryChange(
            e.target.value
          )
        }
      >
        <option value="all">
          All categories
        </option>

        {categories.map(
          (category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          )
        )}
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
              | 'due-date'
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

        <option value="due-date">
          Due Date (Soonest First)
        </option>
      </select>

      <input
        id="search-input"
        type="text"
        placeholder="Search tasks..."
        value={searchText}
        onChange={(e) =>
          onSearchChange(
            e.target.value
          )
        }
      />

      {searchText && (
        <button
          id="clear-search"
          type="button"
          onClick={() =>
            onSearchChange('')
          }
        >
          Clear search
        </button>
      )}
    </div>
  )
}