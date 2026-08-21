import { useGetUsersQuery } from '../api/apiSlice'

export default function UsersList() {
  const useQueryHook = useGetUsersQuery
  const { data, isLoading, isError, error } = useQueryHook()

  if (isLoading) {
    return <div data-testid="users-loading">Loading...</div>
  }

  if (isError) {
    const message =
      error && typeof error === 'object' && 'error' in error
        ? String(error.error)
        : 'Error loading users'

    return <div data-testid="users-error">{message}</div>
  }

  return (
    <div data-testid="users-list">
      <ul>
        {data?.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email} — @{user.username}
          </li>
        ))}
      </ul>
    </div>
  )
}