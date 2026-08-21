type ErrorDisplayProps = {
  error?: unknown
  onRetry?: () => void
}

export default function ErrorDisplay({
  error,
  onRetry,
}: ErrorDisplayProps) {
  const message =
    error && typeof error === 'object' && 'error' in error
      ? String(error.error)
      : 'Unable to load users. Please try again.'

  return (
    <div id="error-display" data-testid="error-display">
      <p>{message}</p>

      {onRetry && (
        <button type="button" data-testid="retry-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}