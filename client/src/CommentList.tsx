import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

type Comment = {
    id: string,
    content: string
}
const CommentList = ({ postId }: { postId: string }) => {
    const [comments, setComments] = useState<Comment[]>([])

    // Memoize fetchComments to avoid recreating it on every render
    const fetchComments = useCallback(async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        setComments(res.data);
    }, [postId]); // Add postId as a dependency

    useEffect(() => {
        fetchComments();
    }, [fetchComments]); // Include fetchComments in the dependency array


    const renderedComments = comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
    ));

    return (
        <div>
            <ul style={{ listStyleType: 'disc' }}>{renderedComments}</ul>
            <div className='mt-4' />
        </div>
    );
}

export default CommentList