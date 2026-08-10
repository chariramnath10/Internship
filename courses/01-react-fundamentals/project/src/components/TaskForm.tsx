import { useState } from 'react'
import type { Task } from './TaskList'
import Button from './Button'
import FormInput from './FormInput'
import { useTheme } from '../contexts/ThemeContext'

interface TaskFormProps {
  onAddTask: (task: Task) => void
}

export default function TaskForm({
  onAddTask,
}: TaskFormProps) {
  const { theme } = useTheme()

  const [title, setTitle] = useState('')
  const [description, setDescription] =
    useState('')
  const [priority, setPriority] =
    useState('Medium')
  const [category, setCategory] =
    useState('General')
  const [tags, setTags] = useState('')
  const [dueDate, setDueDate] =
    useState('')
  const [error, setError] =
    useState('')

  const handleSubmit = (
    e: React.FormEvent
  ) => {
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
      description,
      priority,
      completed: false,
      category,
      tags: parsedTags,
      dueDate:
        dueDate || undefined,
    })

    setTitle('')
    setDescription('')
    setPriority('Medium')
    setCategory('General')
    setTags('')
    setDueDate('')
  }

  const formStyle = {
    backgroundColor:
      theme === 'dark'
        ? '#222'
        : '#fff',
    color:
      theme === 'dark'
        ? '#fff'
        : '#111',
    padding: '1rem',
    borderRadius: '8px',
  }

  const inputStyle = {
    backgroundColor:
      theme === 'dark'
        ? '#333'
        : '#fff',
    color:
      theme === 'dark'
        ? '#fff'
        : '#111',
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={formStyle}
    >
      <FormInput
        id="task-title"
        label="Title"
        type="text"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        error={error}
      />

      <FormInput
        id="task-description"
        label="Description"
        type="textarea"
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
        style={inputStyle}
      >
        <option value="Low">Low</option>
        <option value="Medium">
          Medium
        </option>
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
        style={inputStyle}
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
        style={inputStyle}
      />

      <label htmlFor="task-due-date">
        Due Date
      </label>

      <input
        id="task-due-date"
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(e.target.value)
        }
        style={inputStyle}
      />

      <Button
        type="submit"
        variant="primary"
      >
        Add Task
      </Button>
    </form>
  )
}