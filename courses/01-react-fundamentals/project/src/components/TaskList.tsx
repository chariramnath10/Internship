import { useCallback } from "react";
import TaskCard from "./TaskCard";
import ErrorBoundary from "./ErrorBoundary";

export interface Task {
  id: string | number;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
  category?: string;
  tags?: string[];
  dueDate?: string | number;
}

export interface TaskListProps {
  tasks?: Task[];
  totalTasks?: number;
  countText?: string;
  onToggle?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  onUpdateTask?: (
    id: string | number,
    updates: {
      title: string;
      description: string;
      priority: string;
      category: string;
      tags: string[];
      dueDate?: string;
    },
  ) => void;
  editingId?: string | number | null;
  setEditingId?: (id: string | number | null) => void;
  linkToTaskDetail?: boolean;
}

const HARDCODED_TASKS: Task[] = [
  {
    id: 1,
    title: "Task One",
    description: "First hardcoded task",
    priority: "High",
    completed: false,
    category: "General",
    tags: [],
  },
  {
    id: 2,
    title: "Task Two",
    description: "Second hardcoded task",
    priority: "Medium",
    completed: false,
    category: "General",
    tags: [],
  },
  {
    id: 3,
    title: "Task Three",
    description: "Third hardcoded task",
    priority: "Low",
    completed: false,
    category: "General",
    tags: [],
  },
];

export default function TaskList({
  tasks,
  totalTasks,
  countText,
  onToggle,
  onDelete,
  onUpdateTask,
  editingId,
  setEditingId,
  linkToTaskDetail,
}: TaskListProps) {
  const list =
    tasks && tasks.length >= 0
      ? tasks
      : HARDCODED_TASKS;

  const handleEdit = useCallback(
    (id: string | number) => {
      setEditingId?.(id);
    },
    [setEditingId],
  );

  const handleCancelEdit = useCallback(() => {
    setEditingId?.(null);
  }, [setEditingId]);

  return (
    <section id="task-list">
      {list.length === 0 && <p>No tasks found</p>}

      {list.map((task) => (
        <ErrorBoundary key={task.id}>
          <TaskCard
            taskId={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            completed={task.completed}
            category={task.category ?? "General"}
            tags={task.tags ?? []}
            dueDate={task.dueDate}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdateTask={onUpdateTask}
            isEditing={editingId === task.id}
            onEdit={handleEdit}
            onCancelEdit={handleCancelEdit}
            linkToTaskDetail={linkToTaskDetail}
          />
        </ErrorBoundary>
      ))}

      <h2 id="task-count">
        {countText ??
          `Showing ${list.length} of ${
            totalTasks ?? list.length
          } tasks`}
      </h2>
    </section>
  );
}