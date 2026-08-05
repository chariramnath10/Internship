import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
import TaskList from './TaskList'

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

export default function TaskApp(props: TaskAppProps) {
  const countText = `${props.tasks?.length ?? 0} Tasks`

  return (
    <>
      <h2 id="task-count">{countText}</h2>

      <TaskList
        tasks={props.tasks}
        onDelete={props.onDelete}
        linkToTaskDetail={props.linkToTaskDetail}
      />
    </>
  )
}
