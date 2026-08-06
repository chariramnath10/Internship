import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
import TaskList from './TaskList'
import TaskForm from './TaskForm'

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
  onDelete,
  linkToTaskDetail,
}: TaskAppProps) {
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

  return (
    <>
      {showForm && <TaskForm onAddTask={handleAddTask} />}

      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onDelete={onDelete}
        linkToTaskDetail={linkToTaskDetail}
      />
    </>
  )
}