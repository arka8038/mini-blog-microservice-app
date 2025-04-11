import { useState } from "react"
import axios from "axios"

function PostCreate() {
    const [title, setTitle] = useState('')

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await axios.post('http://localhost:4000/posts', {
            title
        })
        setTitle('')
    }

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter post title"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default PostCreate
