type Comment = {
    id: string,
    content: string
}
const CommentList = ({ comments }: { comments: Comment[] }) => {
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