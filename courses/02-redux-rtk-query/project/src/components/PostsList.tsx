import { useGetPostsQuery } from '../api/apiSlice'

export default function PostsList() {
  const { data, isLoading, isError, error } = useGetPostsQuery()

  if (isLoading) {
    return (
      <div id="posts-list" data-testid="posts-list">
        Loading posts...
      </div>
    )
  }

  if (isError) {
    return (
      <div id="posts-list" data-testid="posts-list">
        Error loading posts
        {error && typeof error === 'object' && 'error' in error
          ? `: ${String(error.error)}`
          : ''}
      </div>
    )
  }

  return (
    <div id="posts-list" data-testid="posts-list">
      <h3>Posts</h3>

      {data && data.length > 0 ? (
        <ul>
          {data.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  )
}