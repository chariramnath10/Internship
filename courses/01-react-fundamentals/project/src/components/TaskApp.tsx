import { useState } from 'react'
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

export default function TaskApp({
  tasks = [],
  setTasks,
  showForm = false,
  showFilterBar = false,
  onDelete,
  linkToTaskDetail,
}: TaskAppProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const handleAddTask = (task: Task) => {
    setTasks?.((prev) => [...prev, task])
  }

  const handleToggle = (id: string | number) => {
    setTasks?.((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task,
      ),
    )
  }

  const filteredTasks =
    filter === 'all'
      ? tasks
      : filter === 'active'
        ? tasks.filter((task) => !task.completed)
        : tasks.filter((task) => task.completed)

  return (
    <>
      {showForm && <TaskForm onAddTask={handleAddTask} />}

      {showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
        />
      )}

      <TaskList
        tasks={filteredTasks}
        totalTasks={tasks.length}
        onToggle={handleToggle}
        onDelete={onDelete}
        linkToTaskDetail={linkToTaskDetail}
      />
    </>
  )
}