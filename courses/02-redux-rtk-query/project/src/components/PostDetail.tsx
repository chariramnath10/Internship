import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../api/apiSlice'

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>()

  const id = postId ? Number(postId) : 1

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useGetPostByIdQuery(id, {
    skip: !id,
  })

  if (isLoading) {
    return (
      <div data-testid="post-detail-loading">
        Loading post...
      </div>
    )
  }

  if (isError) {
    const message =
      error && typeof error === 'object' && 'error' in error
        ? String(error.error)
        : 'Error loading post.'

    return (
      <div data-testid="post-detail-error">
        {message}
      </div>
    )
  }

  if (!post) {
    return (
      <div data-testid="post-detail">
        Post not found.
      </div>
    )
  }

  return (
    <div id="post-detail" data-testid="post-detail">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p>User ID: {post.userId}</p>
    </div>
  )
}