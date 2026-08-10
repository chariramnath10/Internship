interface StatusIndicatorProps {
  status?:
    | 'overdue'
    | 'due-today'
    | 'due-soon'
    | 'completed'
    | string
}

export default function StatusIndicator({
  status,
}: StatusIndicatorProps) {
  if (!status) {
    return null
  }

  return (
    <span
      id="status-indicator"
      data-status={status}
    >
      {status === 'due-today'
        ? 'Due Today'
        : status === 'due-soon'
          ? 'Due Soon'
          : status === 'overdue'
            ? 'Overdue'
            : status === 'completed'
              ? 'Completed'
              : status}
    </span>
  )
}