import express, { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());

interface Comment {
  id: string;
  content: string;
}

const commentsByPostId: Record<string, Comment[]> = {};

app.get('/posts/:id/comments', (req: Request, res: Response) => {
  res.status(200).send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req: Request, res: Response) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { id: commentId, content, postId: req.params.id },
  });

  res.status(201).send(comments);
});

app.post('/events', async (req: Request, res: Response) => {
  const { type, data } = req.body;
  console.log('Received event:', type, data);

  res.send({ status: 'OK' });
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
