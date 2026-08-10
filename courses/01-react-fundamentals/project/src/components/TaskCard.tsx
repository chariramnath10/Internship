import { useEffect, useState } from 'react'
import Button from './Button'
import Badge from './Badge'
import StatusIndicator from './StatusIndicator'

interface TaskCardProps {
  id?: string | number
  taskId?: string | number
  title: string
  description: string
  priority: string
  completed?: boolean
  category?: string
  tags?: string[]
  dueDate?: string | number
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void
  onUpdateTask?: (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: string
      category: string
      tags: string[]
      dueDate?: string
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
  category = 'General',
  tags = [],
  dueDate,
  onToggle,
  onDelete,
  onUpdateTask,
  isEditing = false,
  onEdit,
  onCancelEdit,
}: TaskCardProps) {
  const taskIdValue = taskId ?? id

  const [editTitle, setEditTitle] =
    useState(title)

  const [editDescription, setEditDescription] =
    useState(description)

  const [editPriority, setEditPriority] =
    useState(priority)

  const [editCategory, setEditCategory] =
    useState(category)

  const [editTags, setEditTags] =
    useState(tags.join(', '))

  const [editDueDate, setEditDueDate] =
    useState(
      dueDate
        ? new Date(dueDate)
            .toISOString()
            .split('T')[0]
        : ''
    )

  useEffect(() => {
    setEditTitle(title)
    setEditDescription(description)
    setEditPriority(priority)
    setEditCategory(category)
    setEditTags(tags.join(', '))
    setEditDueDate(
      dueDate
        ? new Date(dueDate)
            .toISOString()
            .split('T')[0]
        : ''
    )
  }, [
    title,
    description,
    priority,
    category,
    tags,
    dueDate,
    isEditing,
  ])

  const handleSave = () => {
    if (
      !editTitle.trim() ||
      taskIdValue === undefined
    ) {
      return
    }

    const parsedTags = editTags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    onUpdateTask?.(taskIdValue, {
      title: editTitle.trim(),
      description: editDescription,
      priority: editPriority,
      category: editCategory,
      tags: parsedTags,
      dueDate:
        editDueDate || undefined,
    })
  }

  const handleCancel = () => {
    setEditTitle(title)
    setEditDescription(description)
    setEditPriority(priority)
    setEditCategory(category)
    setEditTags(tags.join(', '))
    setEditDueDate(
      dueDate
        ? new Date(dueDate)
            .toISOString()
            .split('T')[0]
        : ''
    )

    onCancelEdit?.()
  }

  const getDueStatus = () => {
    if (!dueDate || completed) {
      return ''
    }

    const due = new Date(dueDate)
    const today = new Date()

    due.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)

    const difference =
      due.getTime() - today.getTime()

    const daysUntil =
      difference /
      (1000 * 60 * 60 * 24)

    if (daysUntil < 0) {
      return 'Overdue'
    }

    if (daysUntil === 0) {
      return 'Due Today'
    }

    if (daysUntil <= 3) {
      return 'Due Soon'
    }

    return ''
  }

  const dueStatus = getDueStatus()

  const isOverdue =
    dueStatus === 'Overdue'

  const statusValue =
    dueStatus === 'Overdue'
      ? 'overdue'
      : dueStatus === 'Due Today'
        ? 'due-today'
        : dueStatus === 'Due Soon'
          ? 'due-soon'
          : completed
            ? 'completed'
            : ''

  return (
    <article
      id="task-card"
      data-completed={completed}
      data-overdue={
        isOverdue ? 'true' : 'false'
      }
      style={{
        backgroundColor: completed
          ? '#e6ffe6'
          : isOverdue
            ? '#ffe6e6'
            : '#fff',
      }}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => {
          if (taskIdValue !== undefined) {
            onToggle?.(taskIdValue)
          }
        }}
      />

      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) =>
              setEditTitle(e.target.value)
            }
          />

          <textarea
            value={editDescription}
            onChange={(e) =>
              setEditDescription(
                e.target.value
              )
            }
          />

          <select
            value={editPriority}
            onChange={(e) =>
              setEditPriority(
                e.target.value
              )
            }
          >
            <option value="High">
              High
            </option>
            <option value="Medium">
              Medium
            </option>
            <option value="Low">
              Low
            </option>
          </select>

          <select
            value={editCategory}
            onChange={(e) =>
              setEditCategory(
                e.target.value
              )
            }
          >
            <option value="General">
              General
            </option>
            <option value="Work">
              Work
            </option>
            <option value="Personal">
              Personal
            </option>
          </select>

          <input
            type="text"
            value={editTags}
            onChange={(e) =>
              setEditTags(e.target.value)
            }
          />

          <input
            id="task-due-date"
            type="date"
            value={editDueDate}
            onChange={(e) =>
              setEditDueDate(
                e.target.value
              )
            }
          />

          <Button
            type="button"
            variant="primary"
            onClick={handleSave}
          >
            Save
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
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

          <p>
            Priority:{' '}
            <Badge variant="priority">
              {priority}
            </Badge>
          </p>

          <p id="task-category">
            Category:{' '}
            <Badge variant="category">
              {category}
            </Badge>
          </p>

          {tags.length > 0 && (
            <div id="task-tags">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="tag"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {dueDate && (
            <p
              id="task-due-date"
              data-overdue={
                isOverdue
                  ? 'true'
                  : 'false'
              }
            >
              Due Date:{' '}
              {new Date(
                dueDate
              ).toLocaleDateString()}{' '}

              <StatusIndicator
                status={statusValue}
              />
            </p>
          )}

          {completed && !dueStatus && (
            <StatusIndicator
              status="completed"
            />
          )}

          {onUpdateTask && (
            <Button
              type="button"
              variant="secondary"
              onClick={onEdit}
            >
              Edit
            </Button>
          )}

          {onDelete && (
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                if (
                  window.confirm(
                    'Are you sure?'
                  ) &&
                  taskIdValue !== undefined
                ) {
                  onDelete(taskIdValue)
                }
              }}
            >
              Delete
            </Button>
          )}
        </>
      )}
    </article>
  )
}