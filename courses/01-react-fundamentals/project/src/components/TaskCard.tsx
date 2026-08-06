import { useEffect, useState } from 'react'

interface TaskCardProps {
  id?: string | number
  taskId?: string | number
  title: string
  description: string
  priority: string
  completed?: boolean
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void
  onUpdateTask?: (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: string
    }
  ) => void
  isEditing?: boolean
  onEdit?: () => void
  onCancelEdit?: () => void
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
  onUpdateTask,
  isEditing = false,
  onEdit,
  onCancelEdit,
}: TaskCardProps) {
  const taskIdValue = taskId ?? id

  const [editTitle, setEditTitle] = useState(title)
  const [editDescription, setEditDescription] =
    useState(description)
  const [editPriority, setEditPriority] =
    useState(priority)

  useEffect(() => {
    setEditTitle(title)
    setEditDescription(description)
    setEditPriority(priority)
  }, [title, description, priority, isEditing])

  const handleSave = () => {
    if (!editTitle.trim() || taskIdValue === undefined) {
      return
    }

    onUpdateTask?.(taskIdValue, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
    })
  }

  const handleCancel = () => {
    setEditTitle(title)
    setEditDescription(description)
    setEditPriority(priority)
    onCancelEdit?.()
  }

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

      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />

          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button
            type="button"
            onClick={handleSave}
          >
            Save
          </button>

          <button
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2
            style={{
              textDecoration: completed
                ? 'line-through'
                : 'none',
            }}
          >
            {title}
          </h2>

          <p
            style={{
              textDecoration: completed
                ? 'line-through'
                : 'none',
            }}
          >
            {description}
          </p>

          <p>Priority: {priority}</p>

          {onUpdateTask && (
            <button
              type="button"
              onClick={onEdit}
            >
              Edit
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={() => {
                if (
                  window.confirm('Are you sure?') &&
                  taskIdValue !== undefined
                ) {
                  onDelete(taskIdValue)
                }
              }}
            >
              Delete
            </button>
          )}
        </>
      )}
    </article>
  )
}