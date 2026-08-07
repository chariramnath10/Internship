import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Task } from './TaskList'

interface TaskFormProps {
  onAddTask: (task: Task) => void
}

export default function TaskForm({
  onAddTask,
}: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] =
    useState('')
  const [priority, setPriority] =
    useState('Medium')
  const [category, setCategory] =
    useState('General')
  const [tags, setTags] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (title.trim() === '') {
      setError('Title is required')
      return
    }

    setError('')

    const parsedTags = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    onAddTask({
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false,
      category,
      tags: parsedTags,
    })

    setTitle('')
    setDescription('')
    setPriority('Medium')
    setCategory('General')
    setTags('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task-title">
        Title
      </label>

      <input
        id="task-title"
        type="text"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <label htmlFor="task-description">
        Description
      </label>

      <textarea
        id="task-description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <label htmlFor="task-priority">
        Priority
      </label>

      <select
        id="task-priority"
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <label htmlFor="task-category">
        Category
      </label>

      <select
        id="task-category"
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="General">
          General
        </option>
        <option value="Work">Work</option>
        <option value="Personal">
          Personal
        </option>
      </select>

      <label htmlFor="task-tags">
        Tags
      </label>

      <input
        id="task-tags"
        type="text"
        placeholder="e.g. urgent, frontend, project"
        value={tags}
        onChange={(e) =>
          setTags(e.target.value)
        }
      />

      {error && (
        <p id="task-form-error">
          {error}
        </p>
      )}

      <button type="submit">
        Add Task
      </button>
    </form>
  )
}