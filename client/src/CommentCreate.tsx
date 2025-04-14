import React from 'react'
import axios from 'axios'

const CommentCreate = ({ postId }: { postId: string }) => {
    const [content, setContent] = React.useState('')

    type OnSubmitEvent = React.FormEvent<HTMLFormElement>

    const onSubmit = async (event: OnSubmitEvent): Promise<void> => {
        event.preventDefault()
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content
        })
        setContent('')
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="comment">New Comment</label>
                    <input
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className='form-control' />
                </div>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default CommentCreate