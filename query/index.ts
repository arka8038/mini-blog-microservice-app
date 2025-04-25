import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

type Post = {
  id: string;
  title: string;
  comments: Comment[];
};

type Comment = {
  id: string;
  content: string;
  status: string;
};

const posts: Record<string, Post> = {};

app.get('/posts', (_req: Request, res: Response) => {
  console.log('Posts', posts);
  res.status(200).send(posts);
});

app.post('/events', (req: Request, res: Response) => {
  const { type, data } = req.body;
  console.log('Received event:', type, data);

  if (type === 'PostCreated') {
    const {
      id,
      title,
      comments: [],
    } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;
    const comment = posts[postId].comments.find((comment) => id === comment.id);
    if (comment) {
      comment.status = status;
      comment.content = content;
    }
  }

  console.log('Posts', posts);
  res.send({ status: 'OK' });
});

app.listen(4002, () => {
  console.log('Query service is listening on port 4002');
});
