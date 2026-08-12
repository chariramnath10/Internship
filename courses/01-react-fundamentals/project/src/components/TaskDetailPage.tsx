import { useNavigate, useParams } from "react-router-dom";
import type { Task } from "./TaskList";

const STORAGE_KEY = "task-app-tasks";

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  let tasks: Task[] = [];

  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);

    if (storedTasks) {
      const parsed = JSON.parse(storedTasks);

      if (Array.isArray(parsed)) {
        tasks = parsed;
      }
    }
  } catch {
    tasks = [];
  }

  const task = tasks.find(
    (item) => String(item.id) === String(id),
  );

  if (!task) {
    return (
      <div id="task-detail-page">
        <h2>Task not found</h2>

        <button
          id="task-detail-back"
          type="button"
          onClick={() =>
            navigate("/challenge/21-react-router")
          }
        >
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div id="task-detail-page">
      <h1>{task.title}</h1>

      <p>{task.description}</p>

      <p>
        Priority: {task.priority}
      </p>

      <p>
        Status:{" "}
        {task.completed ? "Completed" : "Active"}
      </p>

      {task.category && (
        <p>Category: {task.category}</p>
      )}

      {task.tags && task.tags.length > 0 && (
        <p>
          Tags: {task.tags.join(", ")}
        </p>
      )}

      {task.dueDate && (
        <p>
          Due Date:{" "}
          {new Date(
            task.dueDate,
          ).toLocaleDateString()}
        </p>
      )}

      <button
        id="task-detail-back"
        type="button"
        onClick={() =>
          navigate("/challenge/21-react-router")
        }
      >
        Back to list
      </button>
    </div>
  );
}