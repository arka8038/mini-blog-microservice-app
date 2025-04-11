import './App.css'
import PostCreate from './PostCreate'
import PostList from './PostList'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Create a Post</h1>
          <PostCreate />
        </div>
        <hr className="border-t border-gray-300" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Posts</h1>
          <PostList />
        </div>
      </div>
    </div>
  )
}

export default App
