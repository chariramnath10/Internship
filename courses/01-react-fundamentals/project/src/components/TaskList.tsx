import TaskCard from './TaskCard'

export interface Task {
  id: string | number
  title: string
  description: string
  priority: string
  completed: boolean
  category?: string
  tags?: string[]
  dueDate?: string | number
}

export interface TaskListProps {
  tasks?: Task[]
  totalTasks?: number
  countText?: string
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
}

const HARDCODED_TASKS: Task[] = [
  {
    id: 1,
    title: 'Task One',
    description: 'First hardcoded task',
    priority: 'High',
    completed: false,
  },
  {
    id: 2,
    title: 'Task Two',
    description: 'Second hardcoded task',
    priority: 'Medium',
    completed: false,
  },
  {
    id: 3,
    title: 'Task Three',
    description: 'Third hardcoded task',
    priority: 'Low',
    completed: false,
  },
]

export default function TaskList({
  tasks,
  totalTasks,
  countText,
  onToggle,
  onDelete,
}: TaskListProps) {
  const list = tasks && tasks.length >= 0 ? tasks : HARDCODED_TASKS

  return (
    <section id="task-list">
      <h2 id="task-count">
        {countText ??
          `Showing ${list.length} of ${totalTasks ?? list.length} tasks`}
      </h2>

      {list.length === 0 && (
        <p id="filter-empty-message">
          No tasks match this filter
        </p>
      )}

      {list.map((task) => (
        <TaskCard
          key={task.id}
          taskId={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          completed={task.completed}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </section>
  )
}