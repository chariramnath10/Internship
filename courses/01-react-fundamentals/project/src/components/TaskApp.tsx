import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import type { Task } from './TaskList'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import FilterBar from './FilterBar'
import StatsPanel from './StatsPanel'
import Button from './Button'

import { useTheme } from '../contexts/ThemeContext'

import {
  ADD_TASK,
  TOGGLE_TASK,
  UPDATE_TASK,
  type TaskAction,
} from '../taskReducer'

interface TaskAppProps {
  tasks?: Task[]
  dispatch?: React.Dispatch<TaskAction>
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
}

type Filter =
  | 'all'
  | 'active'
  | 'completed'

type SortOrder =
  | 'recent'
  | 'high-low'
  | 'low-high'
  | 'alphabetical'
  | 'due-date'

export default function TaskApp({
  tasks = [],
  dispatch,
  showForm = false,
  showFilterBar = false,
  showStatsPanel = false,
  onDelete,
  linkToTaskDetail,
}: TaskAppProps) {
  const { theme, toggleTheme } = useTheme()

  const [filter, setFilter] =
    useState<Filter>('all')

  const [categoryFilter, setCategoryFilter] =
    useState('all')

  const [sortOrder, setSortOrder] =
    useState<SortOrder>('recent')

  const [searchText, setSearchText] =
    useState('')

  const [
    debouncedSearchText,
    setDebouncedSearchText,
  ] = useState('')

  const [editingId, setEditingId] =
    useState<string | number | null>(null)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchText(searchText)
    }, 300)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [searchText])

  const handleAddTask = useCallback(
    (task: Task) => {
      dispatch?.({
        type: ADD_TASK,
        payload: {
          ...task,
          category:
            task.category || 'General',
          tags: task.tags ?? [],
        },
      })
    },
    [dispatch]
  )

  const handleToggle = useCallback(
    (id: string | number) => {
      dispatch?.({
        type: TOGGLE_TASK,
        payload: id,
      })
    },
    [dispatch]
  )

  const handleUpdateTask = useCallback(
    (
      id: string | number,
      updates: {
        title: string
        description: string
        priority: string
        category: string
        tags: string[]
        dueDate?: string
      }
    ) => {
      if (!updates.title.trim()) {
        return
      }

      dispatch?.({
        type: UPDATE_TASK,
        payload: {
          id,
          ...updates,
          category:
            updates.category || 'General',
          tags: updates.tags ?? [],
        },
      })

      setEditingId(null)
    },
    [dispatch]
  )

  const categories = useMemo(() => {
    return [
      ...new Set(
        tasks
          .map(
            (task) =>
              task.category || 'General'
          )
          .filter(Boolean)
      ),
    ]
  }, [tasks])

  const priorityValue = useCallback(
    (priority: string) => {
      switch (priority.toLowerCase()) {
        case 'high':
          return 3
        case 'medium':
          return 2
        case 'low':
          return 1
        default:
          return 0
      }
    },
    []
  )

  const dueDateValue = useCallback(
    (dueDate?: string | number) => {
      if (
        dueDate === undefined ||
        dueDate === ''
      ) {
        return null
      }

      const value = new Date(
        dueDate
      ).getTime()

      return Number.isNaN(value)
        ? null
        : value
    },
    []
  )

  const sortedTasks = useMemo(() => {
    const search =
      debouncedSearchText
        .trim()
        .toLowerCase()

    let result = tasks

    if (filter !== 'all') {
      result =
        filter === 'active'
          ? result.filter(
              (task) => !task.completed
            )
          : result.filter(
              (task) => task.completed
            )
    }

    if (categoryFilter !== 'all') {
      result = result.filter(
        (task) =>
          (task.category || 'General') ===
          categoryFilter
      )
    }

    if (search) {
      result = result.filter((task) => {
        return (
          task.title
            .toLowerCase()
            .includes(search) ||
          task.description
            .toLowerCase()
            .includes(search) ||
          (task.category || 'General')
            .toLowerCase()
            .includes(search) ||
          (task.tags ?? []).some((tag) =>
            tag
              .toLowerCase()
              .includes(search)
          )
        )
      })
    }

    const sorted = [...result]

    sorted.sort((a, b) => {
      switch (sortOrder) {
        case 'high-low':
          return (
            priorityValue(b.priority) -
            priorityValue(a.priority)
          )

        case 'low-high':
          return (
            priorityValue(a.priority) -
            priorityValue(b.priority)
          )

        case 'alphabetical':
          return a.title.localeCompare(
            b.title,
            undefined,
            {
              sensitivity: 'base',
            }
          )

        case 'due-date': {
          const aDate = dueDateValue(
            a.dueDate
          )

          const bDate = dueDateValue(
            b.dueDate
          )

          if (
            aDate === null &&
            bDate === null
          ) {
            return 0
          }

          if (aDate === null) {
            return 1
          }

          if (bDate === null) {
            return -1
          }

          return aDate - bDate
        }

        case 'recent':
        default:
          return (
            Number(a.id) - Number(b.id)
          )
      }
    })

    return sorted
  }, [
    tasks,
    filter,
    categoryFilter,
    sortOrder,
    debouncedSearchText,
    priorityValue,
    dueDateValue,
  ])

  const isSearching =
    searchText !== debouncedSearchText

  return (
    <>
      <Button
        id="theme-toggle"
        type="button"
        variant="secondary"
        onClick={toggleTheme}
      >
        {theme === 'light'
          ? 'Dark Mode'
          : 'Light Mode'}
      </Button>

      <div
        id="theme-controls"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '1rem',
        }}
      />

      {showForm && (
        <TaskForm
          onAddTask={handleAddTask}
        />
      )}

      {showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={
            setCategoryFilter
          }
          categories={categories}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          searchText={searchText}
          onSearchChange={setSearchText}
        />
      )}

      {isSearching && (
        <p id="searching-indicator">
          Searching...
        </p>
      )}

      {showStatsPanel && (
        <StatsPanel tasks={tasks} />
      )}

      <TaskList
        tasks={sortedTasks}
        totalTasks={tasks.length}
        countText={`Showing ${sortedTasks.length} of ${tasks.length} tasks`}
        onToggle={handleToggle}
        onDelete={onDelete}
        editingId={editingId}
        setEditingId={setEditingId}
        onUpdateTask={handleUpdateTask}
        linkToTaskDetail={
          linkToTaskDetail
        }
      />
    </>
  )
}