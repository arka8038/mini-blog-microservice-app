import express, { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';

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

app.post('/posts/:id/comments', (req: Request, res: Response) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log('Listening on 4001');
});
