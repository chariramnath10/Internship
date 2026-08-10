import Button from './Button'
import FormInput from './FormInput'

interface FilterBarProps {
  filter:
    | 'all'
    | 'active'
    | 'completed'

  onFilterChange: (
    filter:
      | 'all'
      | 'active'
      | 'completed'
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

  onSearchChange: (
    value: string
  ) => void
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
      <Button
        type="button"
        variant={
          filter === 'all'
            ? 'primary'
            : 'secondary'
        }
        onClick={() =>
          onFilterChange('all')
        }
      >
        All
      </Button>

      <Button
        type="button"
        variant={
          filter === 'active'
            ? 'primary'
            : 'secondary'
        }
        onClick={() =>
          onFilterChange('active')
        }
      >
        Active
      </Button>

      <Button
        type="button"
        variant={
          filter === 'completed'
            ? 'primary'
            : 'secondary'
        }
        onClick={() =>
          onFilterChange('completed')
        }
      >
        Completed
      </Button>

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

      <FormInput
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
        <Button
          id="clear-search"
          type="button"
          variant="secondary"
          onClick={() =>
            onSearchChange('')
          }
        >
          Clear search
        </Button>
      )}
    </div>
  )
}