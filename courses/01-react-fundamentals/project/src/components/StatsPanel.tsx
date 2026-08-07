import { useMemo } from 'react'
import type { Task } from './TaskList'

interface StatsPanelProps {
  tasks?: Task[]
  total?: number
  completed?: number
  active?: number
  overdue?: number
  completedPercentage?: number
}

export default function StatsPanel({
  tasks,
  total = 0,
  completed = 0,
  active = 0,
  overdue = 0,
  completedPercentage = 0,
}: StatsPanelProps) {
  const stats = useMemo(() => {
    // When tasks are provided, calculate statistics from them.
    if (tasks !== undefined) {
      const taskTotal = tasks.length

      const taskCompleted = tasks.filter(
        (task) => task.completed
      ).length

      const taskActive = tasks.filter(
        (task) => !task.completed
      ).length

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const taskOverdue = tasks.filter((task) => {
        if (task.completed || !task.dueDate) {
          return false
        }

        const dueDate = new Date(task.dueDate)
        dueDate.setHours(0, 0, 0, 0)

        return dueDate < today
      }).length

      const percentage =
        taskTotal === 0
          ? 0
          : Math.round(
              (taskCompleted / taskTotal) * 100
            )

      return {
        total: taskTotal,
        completed: taskCompleted,
        active: taskActive,
        overdue: taskOverdue,
        completedPercentage: percentage,
      }
    }

    // Support the original StatsPanel props.
    return {
      total,
      completed,
      active,
      overdue,
      completedPercentage,
    }
  }, [
    tasks,
    total,
    completed,
    active,
    overdue,
    completedPercentage,
  ])

  return (
    <section id="stats-panel">
      <h2>Task Statistics</h2>

      <p>
        Total: {stats.total}
      </p>

      <p>
        Completed: {stats.completed}
      </p>

      <p>
        Active: {stats.active}
      </p>

      <p>
        Overdue: {stats.overdue}
      </p>

      <p>
        Completion: {stats.completedPercentage}%
      </p>

      <div
        role="progressbar"
        aria-valuenow={
          stats.completedPercentage
        }
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          width: '100%',
          height: '20px',
          backgroundColor:
            'rgb(221, 221, 221)',
        }}
      >
        <div
          style={{
            width: `${stats.completedPercentage}%`,
            height: '100%',
            backgroundColor:
              'rgb(76, 175, 80)',
          }}
        />
      </div>
    </section>
  )
}