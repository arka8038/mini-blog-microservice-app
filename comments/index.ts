import express, { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());

type Comment = {
  id: string;
  content: string;
  status: string;
};

const commentsByPostId: Record<string, Comment[]> = {};

app.get('/posts/:id/comments', (req: Request, res: Response) => {
  res.status(200).send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req: Request, res: Response) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: 'pending' });
  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { id: commentId, content, postId: req.params.id, status: 'pending' },
  });

  console.log('Comments', comments);

  res.status(201).send(comments);
});

app.post('/events', async (req: Request, res: Response) => {
  const { type, data } = req.body;
  console.log('Received event:', type, data);

  if (type === 'CommentModerated') {
    const { id, postId, content, status } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => id === comment.id);

    if (comment) {
      comment.status = status;
    }

    axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        postId,
        content,
        status,
      },
    });
  }

  res.send({ status: 'OK' });
});

app.listen(4001, () => {
  console.log('Comments service is listening on port 4001');
});
