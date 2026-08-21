import { useMemo } from 'react'
import { useGetPostsQuery } from '../api/apiSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setFilterUserId, setSortBy, type SortBy } from '../store/slices/filtersSlice'

export default function PostsWithFilters() {
  const dispatch = useAppDispatch()
  const { data: posts, isLoading, isError } = useGetPostsQuery()

  const { sortBy, filterUserId } = useAppSelector(
    (state) => state.filters,
  )

  const filteredAndSortedPosts = useMemo(() => {
    if (!posts) {
      return []
    }

    const filteredPosts =
      filterUserId === null
        ? posts
        : posts.filter((post) => post.userId === filterUserId)

    return [...filteredPosts].sort((a, b) => {
      if (sortBy === 'oldest') {
        return a.id - b.id
      }

      if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      }

      return b.id - a.id
    })
  }, [posts, filterUserId, sortBy])

  const handleSortChange = (value: SortBy) => {
    dispatch(setSortBy(value))
  }

  if (isLoading) {
    return (
      <div data-testid="posts-with-filters">
        <div data-testid="filter-controls">
          <p>Loading posts...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div data-testid="posts-with-filters">
        <div data-testid="filter-controls">
          <p>Error loading posts.</p>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="posts-with-filters">
      <h3>Posts with Filters</h3>

      <div data-testid="filter-controls">
        <label htmlFor="post-user-filter">
          User:
        </label>

        <select
          id="post-user-filter"
          value={filterUserId ?? ''}
          onChange={(event) => {
            const value = event.target.value
            dispatch(
              setFilterUserId(value === '' ? null : Number(value)),
            )
          }}
        >
          <option value="">All Users</option>
          <option value="1">User 1</option>
          <option value="2">User 2</option>
        </select>

        <label htmlFor="post-sort">
          Sort:
        </label>

        <select
          id="post-sort"
          value={sortBy}
          onChange={(event) =>
            handleSortChange(event.target.value as SortBy)
          }
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title</option>
        </select>
      </div>

      <ul>
        {filteredAndSortedPosts.length > 0 ? (
          filteredAndSortedPosts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
              <small>User {post.userId}</small>
            </li>
          ))
        ) : (
          <li>No posts match the selected filter.</li>
        )}
      </ul>
    </div>
  )
}