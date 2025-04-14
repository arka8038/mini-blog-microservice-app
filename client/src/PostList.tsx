import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

interface Post {
  id: string
  title: string
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const res = await axios.get<Post[]>('http://localhost:4000/posts')
        setPosts(res.data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.')
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="mt-4 text-gray-600 text-center">
        <p>Loading posts...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    )
  }

  const renderedPosts = posts.map(post => (
    <div
      key={post.id}
      className="bg-white shadow rounded-lg p-4 w-full sm:w-[48%] md:w-[30%] mb-4"
    >
      <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
      <CommentList postId={post.id} />
      <CommentCreate postId={post.id} />
    </div>
  ))

  return (
    <div className="flex flex-wrap justify-between gap-4">
      {renderedPosts}
    </div>
  )
}

export default PostList
