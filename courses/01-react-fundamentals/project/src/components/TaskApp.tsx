import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import FilterBar from './FilterBar'

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  dispatch?: (action: { type: string; payload?: unknown }) => void
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
}

type Filter = 'all' | 'active' | 'completed'

type SortOrder =
  | 'recent'
  | 'high-low'
  | 'low-high'
  | 'alphabetical'

export default function TaskApp({
  tasks = [],
  setTasks,
  showForm = false,
  showFilterBar = false,
  onDelete,
  linkToTaskDetail,
}: TaskAppProps) {
  const [filter, setFilter] =
    useState<Filter>('all')

  const [sortOrder, setSortOrder] =
    useState<SortOrder>('recent')

  const [searchText, setSearchText] =
    useState('')

  const [debouncedSearchText, setDebouncedSearchText] =
    useState('')

  const [editingId, setEditingId] =
    useState<string | number | null>(null)

  const handleAddTask = (task: Task) => {
    setTasks?.((prev) => [...prev, task])
  }

  const handleToggle = (
    id: string | number
  ) => {
    setTasks?.((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    )
  }

  const handleUpdateTask = (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: string
    }
  ) => {
    if (!updates.title.trim()) {
      return
    }

    setTasks?.((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updates }
          : task
      )
    )

    setEditingId(null)
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchText(searchText)
    }, 300)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [searchText])

  const isSearching =
    searchText !== debouncedSearchText

  const statusFilteredTasks =
    filter === 'all'
      ? tasks
      : filter === 'active'
        ? tasks.filter(
            (task) => !task.completed
          )
        : tasks.filter(
            (task) => task.completed
          )

  const searchFilteredTasks =
    statusFilteredTasks.filter((task) => {
      const search =
        debouncedSearchText
          .trim()
          .toLowerCase()

      if (!search) {
        return true
      }

      return (
        task.title
          .toLowerCase()
          .includes(search) ||
        task.description
          .toLowerCase()
          .includes(search)
      )
    })

  const priorityValue = (
    priority: string
  ) => {
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
  }

  const sortedTasks = [
    ...searchFilteredTasks,
  ].sort((a, b) => {
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

      case 'recent':
      default:
        return Number(a.id) - Number(b.id)
    }
  })

  return (
    <>
      {showForm && (
        <TaskForm
          onAddTask={handleAddTask}
        />
      )}

      {showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
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

      <TaskList
        tasks={sortedTasks}
        totalTasks={tasks.length}
        countText={`Showing ${sortedTasks.length} of ${tasks.length} tasks`}
        onToggle={handleToggle}
        onDelete={onDelete}
        editingId={editingId}
        setEditingId={setEditingId}
        onUpdateTask={handleUpdateTask}
        linkToTaskDetail={linkToTaskDetail}
      />
    </>
  )
}