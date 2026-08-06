interface TaskCardProps {
  id?: string | number
  taskId?: string | number
  title: string
  description: string
  priority: string
  completed?: boolean
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void
}

export default function TaskCard({
  id,
  taskId,
  title,
  description,
  priority,
  completed = false,
  onToggle,
  onDelete,
}: TaskCardProps) {
  const taskIdValue = taskId ?? id

  return (
    <article
      id="task-card"
      data-completed={completed}
      style={{
        backgroundColor: completed ? '#e6ffe6' : '#fff',
      }}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle?.(taskIdValue!)}
      />

      <h2
        style={{
          textDecoration: completed ? 'line-through' : 'none',
        }}
      >
        {title}
      </h2>

      <p
        style={{
          textDecoration: completed ? 'line-through' : 'none',
        }}
      >
        {description}
      </p>

      <p>Priority: {priority}</p>

      {onDelete && (
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure?') && taskIdValue !== undefined) {
              onDelete(taskIdValue)
            }
          }}
        >
          Delete
        </button>
      )}
    </article>
  )
}