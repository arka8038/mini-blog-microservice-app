type Comment = {
    id: string;
    content: string;
    status: 'approved' | 'pending' | 'rejected';
};

type CommentListProps = {
    comments: Comment[];
};

const CommentList = ({ comments }: CommentListProps) => {
    const getCommentText = (comment: Comment) => {
        switch (comment.status) {
            case 'approved':
                return comment.content;
            case 'pending':
                return 'Comment is awaiting moderation';
            case 'rejected':
                return 'Comment has been rejected';
            default:
                return '';
        }
    };

    return (
        <div>
            <ul style={{ listStyleType: 'disc' }}>
                {comments.map((comment) => (
                    <li key={comment.id}>{getCommentText(comment)}</li>
                ))}
            </ul>
            <div className="mt-4" />
        </div>
    );
};

export default CommentList;
